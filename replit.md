# Emoji Resizer Web

## Visão Geral
Aplicação web para redimensionar emojis para o Discord Developer Portal. O sistema permite upload de até 9 imagens, redimensiona automaticamente para 128x128 pixels e fornece download em formato ZIP.

## Estado Atual
- **Data**: 19 de Novembro de 2025
- **Status**: Projeto configurado e funcional
- **Tecnologias**: Node.js, Express, HTML/CSS/JavaScript vanilla, JSZip

## Arquitetura do Projeto
```
/
├── src/
│   └── server.js      # Servidor Express na porta 5000
├── public/
│   ├── index.html     # Interface web com drag & drop
│   ├── login.html     # Página de login com Discord/Username
│   └── logo.png       # Logo minimalista do PixelCraft
├── package.json       # Dependências do projeto
├── README.md          # Documentação do usuário
└── replit.md          # Documentação do projeto
```

## Funcionalidades
- ✅ Upload de imagens via drag & drop ou seleção
- ✅ Redimensionamento automático para múltiplos tamanhos (32x32, 64x64, 128x128, 256x256, 512x512)
- ✅ Preview em tempo real das imagens processadas
- ✅ Barra de progresso durante o processamento
- ✅ Nomes pré-definidos para os emojis (SWORDS, PIN, CARDS, etc.)
- ✅ Download em arquivo ZIP
- ✅ Interface responsiva e moderna com tema Galáxia 🌌
- ✅ **Sistema de Anúncios Recompensados**: Assista anúncios de 30 segundos para desbloquear 30 minutos de acesso
- ✅ Timer visual mostrando tempo restante de acesso
- ✅ Sistema de autenticação (Discord OAuth e Username)

## Configuração
- **Porta**: 5000 (configurada para Replit)
- **Bind**: 0.0.0.0 (permitir acesso externo)

## Segurança Implementada
- 🔐 **Helmet**: Headers de segurança HTTP (CSP, HSTS, XSS Protection)
- 🛡️ **Rate Limiting**: Proteção contra ataques de força bruta
  - Login: Máximo 5 tentativas em 15 minutos
  - Geral: Máximo 100 requisições por minuto
- ✅ **Validação de Inputs**: Sanitização e validação com express-validator
- 🔒 **Sessões Seguras**: Cookies httpOnly, sameSite strict, secret forte
- 📏 **Limites de Payload**: Máximo 10MB para uploads
- 🚫 **Content Security Policy**: Restrições de scripts e recursos externos

## Variáveis de Ambiente
- `SESSION_SECRET`: Chave secreta para sessões (recomendado: mínimo 32 caracteres)
- `NODE_ENV`: Ambiente de execução (development/production)
- `GOOGLE_ADSENSE_ID` (Opcional): ID do Google AdSense para monetização com anúncios reais

## Sistema de Anúncios Recompensados
O aplicativo implementa um sistema inovador de monetização:

### Como Funciona
1. **Acesso Inicial**: Usuário faz login e encontra o conteúdo bloqueado
2. **Modal de Anúncio**: Sistema solicita que assista a um anúncio de 30 segundos
3. **Recompensa**: Após assistir, o usuário ganha 30 minutos de acesso completo
4. **Timer Visual**: Contador regressivo mostra tempo restante
5. **Renovação**: Quando o tempo expira, sistema solicita novo anúncio

### Configuração Google AdSense (Opcional)
Para substituir o anúncio de demonstração por anúncios reais do Google:

1. Crie uma conta no [Google AdSense](https://www.google.com/adsense/)
2. Configure Rewarded Ad Units no painel do AdSense
3. Adicione seu Publisher ID ao código HTML (linha com `data-ad-client`)
4. Os anúncios reais começarão a aparecer automaticamente

### Endpoints API
- `GET /api/access-status` - Verifica se o usuário tem acesso e quanto tempo resta
- `POST /api/grant-access` - Concede 30 minutos de acesso após assistir anúncio

## Mudanças Recentes
- 19/11/2025: Sistema de Anúncios Recompensados implementado 🎬
  - Modal de anúncios com design galáxia
  - Anúncios de 30 segundos desbloqueiam 30 minutos de acesso
  - Timer visual mostrando tempo restante
  - API endpoints para controle de acesso (`/api/access-status`, `/api/grant-access`)
  - Bloqueio de conteúdo até assistir anúncio
  - Preparado para integração com Google AdSense Rewarded Ads
  - CSP atualizado para permitir Google AdSense
- 19/11/2025: Design Galáxia 🌌 e Fonte Gota 💧
  - Fundo escuro espacial com efeito de estrelas animadas
  - Fonte Fredoka (estilo arredondado tipo gota)
  - Cores azuis e roxas vibrantes (#93c5fd, #667eea)
  - Efeitos de brilho e glow nos elementos
  - Logo standalone sem texto
- 19/11/2025: Estrutura do projeto reorganizada em pastas
  - Criada pasta `src/` para código do servidor
  - Criada pasta `public/` para arquivos estáticos (HTML, CSS, imagens)
  - Workflow atualizado para executar `node src/server.js`
  - Caminhos no server.js ajustados para a nova estrutura
  - Servidor rodando em http://0.0.0.0:5000
- 19/11/2025: Estrutura do projeto reorganizada
  - Todos os arquivos movidos da pasta emoji-resizer-webzipzipzip/ para a raiz do projeto
- 19/11/2025: Barra de progresso implementada
  - Feedback visual durante processamento de múltiplas imagens
  - Mostra porcentagem e contador de imagens processadas
  - Design moderno com gradiente roxo combinando com o tema
- 19/11/2025: Logo minimalista criada
  - Gerada logo profissional com design pixel art
  - Cores roxas combinando com o tema do site
  - Implementada nas páginas de login e principal
- 19/11/2025: Configuração da integração Discord
  - Discord OAuth configurado para login social
  - Funcionando com autenticação do Replit
- 19/11/2025: Implementação de segurança completa
  - Adicionadas medidas de proteção contra hackers
  - Helmet para headers de segurança HTTP
  - Rate limiting em rotas de autenticação
  - Validação rigorosa de inputs do usuário
  - Proteção CSRF e XSS
  - Content Security Policy configurado
  - Cookies seguros com httpOnly e sameSite
  - Criação de .env.example para configuração
- 19/11/2025: Verificação e correção do projeto
  - Instalação do Node.js 20
  - Configuração do workflow para execução automática
  - Correção da documentação (porta 5000 ao invés de 3000)
  - **Implementação de nomes aleatórios**: Os emojis agora recebem nomes embaralhados aleatoriamente a cada upload
  - Adicionada função shuffleArray() para embaralhar nomes
  - Atualizada interface para indicar ordem aleatória
  - Criação de .gitignore para Node.js
  - Criação de documentação do projeto (replit.md)
