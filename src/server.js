const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1);

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://pagead2.googlesyndication.com", "https://googleads.g.doubleclick.net", "https://www.googletagservices.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            imgSrc: ["'self'", "data:", "https:", "blob:"],
            connectSrc: ["'self'", "https://discord.com", "https://pagead2.googlesyndication.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'self'", "https://googleads.g.doubleclick.net", "https://tpc.googlesyndication.com"],
            childSrc: ["'self'", "https://googleads.g.doubleclick.net"],
        },
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    },
    noSniff: true,
    xssFilter: true,
    hidePoweredBy: true
}));

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
    standardHeaders: true,
    legacyHeaders: false,
});

const generalLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    message: 'Muitas requisições. Tente novamente em breve.',
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(generalLimiter);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));

const sessionSecret = process.env.SESSION_SECRET || require('crypto').randomBytes(32).toString('hex');

// Configurar session store baseado no ambiente
const sessionStore = process.env.NODE_ENV === 'production' 
    ? new FileStore({
        path: './sessions',
        ttl: 7 * 24 * 60 * 60,
        retries: 0
    })
    : undefined; // MemoryStore para desenvolvimento

app.use(session({
    store: sessionStore,
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    name: 'sessionId',
    cookie: { 
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: 'strict'
    }
}));

const csrfProtection = csrf({ 
    cookie: false,
    value: (req) => {
        // Aceitar token do body, query ou headers
        return req.body._csrf || req.query._csrf || req.headers['csrf-token'] || req.headers['x-csrf-token'];
    }
});

app.use(express.static(path.join(__dirname, '../public')));

// Middleware para detectar bots do Google (Googlebot, AdsBot, etc.)
function isGoogleBot(req) {
    const userAgent = req.headers['user-agent'] || '';
    const googleBotPatterns = [
        /googlebot/i,
        /adsbot-google/i,
        /mediapartners-google/i,
        /apis-google/i,
        /google-adwords/i,
        /google page speed/i,
        /feedfetcher-google/i
    ];
    
    return googleBotPatterns.some(pattern => pattern.test(userAgent));
}

async function getDiscordAccessToken() {
    const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
    const xReplitToken = process.env.REPL_IDENTITY 
        ? 'repl ' + process.env.REPL_IDENTITY 
        : process.env.WEB_REPL_RENEWAL 
        ? 'depl ' + process.env.WEB_REPL_RENEWAL 
        : null;

    if (!xReplitToken) {
        throw new Error('X_REPLIT_TOKEN not found');
    }

    const response = await fetch(
        'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=discord',
        {
            headers: {
                'Accept': 'application/json',
                'X_REPLIT_TOKEN': xReplitToken
            }
        }
    );

    const data = await response.json();
    const connection = data.items?.[0];
    return connection?.settings?.access_token || connection?.settings?.oauth?.credentials?.access_token;
}

function isAuthenticated(req, res, next) {
    // Permitir acesso total para bots do Google
    if (isGoogleBot(req)) {
        // Criar uma sessão temporária para o bot com acesso ilimitado
        req.session.user = {
            id: 'googlebot',
            username: 'GoogleBot',
            provider: 'bot'
        };
        req.session.accessExpiry = Date.now() + (365 * 24 * 60 * 60 * 1000); // 1 ano
        return next();
    }
    
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
}

app.get('/', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/login', (req, res) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

app.get('/api/csrf-token', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

app.get('/auth/discord', loginLimiter, async (req, res) => {
    try {
        const accessToken = await getDiscordAccessToken();
        
        if (!accessToken) {
            return res.redirect('/login?error=discord_not_configured');
        }

        const userResponse = await fetch('https://discord.com/api/users/@me', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        const user = await userResponse.json();
        
        req.session.user = {
            id: user.id,
            username: user.username,
            discriminator: user.discriminator,
            avatar: user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : null,
            provider: 'discord'
        };

        res.redirect('/');
    } catch (error) {
        console.error('Discord auth error:', error);
        res.redirect('/login?error=auth_failed');
    }
});

app.post('/auth/username',
    loginLimiter,
    csrfProtection,
    [
        body('username')
            .trim()
            .isLength({ min: 3, max: 20 })
            .withMessage('Nome de usuário deve ter entre 3 e 20 caracteres')
            .matches(/^[a-zA-Z0-9_-]+$/)
            .withMessage('Nome de usuário deve conter apenas letras, números, _ ou -')
            .escape()
    ],
    (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.redirect('/login?error=invalid_username');
        }

        const { username } = req.body;

        req.session.user = {
            id: Date.now().toString(),
            username: username.trim(),
            provider: 'username'
        };

        res.redirect('/');
    }
);

app.get('/api/user', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).json({ error: 'Not authenticated' });
    }
});

app.get('/api/access-status', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    const now = Date.now();
    const accessExpiry = req.session.accessExpiry || 0;
    const hasAccess = now < accessExpiry;
    const remainingTime = hasAccess ? Math.floor((accessExpiry - now) / 1000) : 0;

    res.json({
        hasAccess,
        remainingTime,
        expiryTime: accessExpiry
    });
});

app.post('/api/grant-access', csrfProtection, (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    const accessDuration = 30 * 60 * 1000;
    req.session.accessExpiry = Date.now() + accessDuration;

    res.json({
        success: true,
        accessGranted: true,
        expiryTime: req.session.accessExpiry,
        duration: accessDuration
    });
});

app.post('/logout', csrfProtection, (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✨ PixelCraft rodando em http://0.0.0.0:${PORT}`);
    console.log(`🔐 Sistema de autenticação ativo`);
});
