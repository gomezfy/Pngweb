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
├── server.js          # Servidor Express na porta 5000
├── index.html         # Interface web com drag & drop
├── login.html         # Página de login com Discord/Username
├── logo.png           # Logo minimalista do PixelCraft
├── package.json       # Dependências do projeto
└── README.md         # Documentação do usuário
```

## Funcionalidades
- ✅ Upload de imagens via drag & drop ou seleção
- ✅ Redimensionamento automático para 128x128 pixels
- ✅ Preview em tempo real das imagens processadas
- ✅ Barra de progresso durante o processamento
- ✅ Nomes pré-definidos para os emojis (SWORDS, PIN, CARDS, etc.)
- ✅ Download em arquivo ZIP
- ✅ Interface responsiva e moderna

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

## Mudanças Recentes
- 19/11/2025: Estrutura do projeto reorganizada
  - Todos os arquivos movidos da pasta emoji-resizer-webzipzipzip/ para a raiz do projeto
  - Workflow reconfigurado e funcionando corretamente
  - Servidor rodando em http://0.0.0.0:5000
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
