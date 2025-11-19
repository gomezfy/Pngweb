# 🚀 Guia de Deploy para VertraCloud

## Preparação do Projeto

Este projeto está pronto para deploy na VertraCloud! Siga os passos abaixo:

## 📋 Pré-requisitos

- Conta na [VertraCloud](https://vertracloud.app)
- Git instalado (opcional, dependendo do método de deploy)

## 🔧 Configuração

### 1. Variáveis de Ambiente

Configure as seguintes variáveis de ambiente no painel da VertraCloud:

```env
NODE_ENV=production
SESSION_SECRET=sua-chave-secreta-forte-aqui-minimo-32-caracteres
PORT=3000
```

**⚠️ IMPORTANTE**: Gere uma `SESSION_SECRET` forte e única! Use um gerador de senhas ou:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Estrutura do Projeto

```
emoji-resizer-web/
├── src/
│   └── server.js          # Servidor Express
├── public/
│   ├── index.html         # Página principal
│   ├── login.html         # Página de login
│   └── logo.png           # Logo
├── package.json           # Dependências
└── .gitignore             # Arquivos ignorados
```

## 📦 Métodos de Deploy

### Opção 1: Via Git (Recomendado)

1. **Inicialize o Git** (se ainda não tiver):
   ```bash
   git init
   git add .
   git commit -m "Preparar para deploy"
   ```

2. **No painel da VertraCloud**:
   - Crie um novo projeto Node.js
   - Conecte seu repositório Git (GitHub/GitLab)
   - Configure as variáveis de ambiente
   - A VertraCloud fará o deploy automaticamente

### Opção 2: Upload Manual

1. **Baixe o projeto do Replit**:
   - Clique nos 3 pontos no topo do Replit
   - Selecione "Download as ZIP"

2. **No painel da VertraCloud**:
   - Crie um novo projeto Node.js
   - Faça upload do arquivo ZIP
   - Configure as variáveis de ambiente
   - Inicie o projeto

### Opção 3: Via CLI da VertraCloud

Se a VertraCloud oferecer uma CLI:
```bash
# Instale a CLI (verifique a documentação oficial)
npm install -g vertracloud-cli

# Faça login
vertracloud login

# Deploy
vertracloud deploy
```

## ⚙️ Configurações Importantes

### Porta
O projeto usa a variável `PORT` do ambiente (padrão: 5000).
Configure para a porta que a VertraCloud disponibilizar (geralmente 3000 ou 8080).

### Bind Address
O servidor está configurado para `0.0.0.0` (aceita conexões externas).

### Segurança
- ✅ Helmet configurado para headers HTTP seguros
- ✅ Rate limiting ativo
- ✅ CSRF protection habilitado
- ✅ Validação de inputs
- ✅ Sessões seguras com cookies httpOnly

## 🎬 Sistema de Anúncios (Opcional)

Para ativar anúncios reais do Google AdSense:

1. Crie conta no [Google AdSense](https://www.google.com/adsense/)
2. Adicione seu site (URL da VertraCloud)
3. Configure Rewarded Ad Units
4. Substitua o código demo no HTML pelo código real

## 🔍 Verificação Pós-Deploy

Após o deploy, verifique:

1. ✅ Site está acessível
2. ✅ Login funciona (Discord OAuth e Username)
3. ✅ Sistema de anúncios recompensados funciona
4. ✅ Upload e redimensionamento de imagens funciona
5. ✅ Timer de acesso funciona corretamente
6. ✅ Download de ZIP funciona

## 📞 Suporte

- **VertraCloud**: Entre em contato com o suporte deles para ajuda específica
- **Documentação**: Verifique se há docs.vertracloud.app ou similar

## 🌟 Recursos do Projeto

- Upload de até 9 imagens simultâneas
- Redimensionamento para múltiplos tamanhos (32x32, 64x64, 128x128, 256x256, 512x512)
- Sistema de anúncios recompensados (30s de anúncio = 30min de acesso)
- Timer visual de acesso
- Download em formato ZIP
- Interface galáxia moderna 🌌
- Autenticação Discord OAuth + Username

---

**Boa sorte com o deploy! 🚀**
