# 🎨 Emoji Resizer Web

Aplicação web para redimensionar emojis para o Discord Developer Portal.

## 🚀 Como Usar

1. Inicie o servidor:
```bash
npm install
npm start
```

2. O servidor iniciará automaticamente na porta 5000

3. Arraste as 9 imagens ou clique para selecionar

4. As imagens serão automaticamente redimensionadas para 128x128 pixels

5. Clique em "Baixar Todos os Emojis" para baixar o arquivo ZIP

## 📋 Nomes dos Emojis

As imagens enviadas são automaticamente nomeadas de forma **aleatória** com os seguintes nomes:
- **SWORDS** - Espadas cruzadas
- **PIN** - Bússola
- **CARDS** - Carta Joker
- **BEER** - Caneca de cerveja
- **meat** - Carne/Pernil
- **knife** - Faca
- **WRENCH** - Chave inglesa
- **LINK** - Corrente
- **wheat** - Trigo

**Nota:** A cada upload, os nomes são embaralhados e atribuídos aleatoriamente às imagens.

## ✨ Recursos

- ✅ Redimensiona para 128x128 pixels
- ✅ Otimiza tamanho do arquivo
- ✅ Preview em tempo real
- ✅ Barra de progresso animada
- ✅ Download em ZIP
- ✅ Drag & Drop
- ✅ Interface moderna e responsiva

## 🔐 Segurança

Este projeto implementa múltiplas camadas de segurança para proteção contra ataques:

### Proteções Implementadas
- **Helmet**: Headers de segurança HTTP (CSP, HSTS, XSS Protection)
- **Rate Limiting**: Proteção contra ataques de força bruta
  - Login: Máximo 5 tentativas em 15 minutos
  - Geral: Máximo 100 requisições por minuto
- **Validação de Inputs**: Sanitização e validação rigorosa com express-validator
- **Proteção CSRF**: Proteção contra Cross-Site Request Forgery
- **Sessões Seguras**: Cookies httpOnly, sameSite strict, secret forte
- **Limites de Payload**: Máximo 10MB para uploads
- **Content Security Policy**: Restrições de scripts e recursos externos

### Configuração de Segurança

Recomenda-se configurar as seguintes variáveis de ambiente:

```bash
SESSION_SECRET=sua_chave_secreta_aqui_minimo_32_caracteres
NODE_ENV=production
```

**Importante**: Use uma chave secreta forte e única para `SESSION_SECRET` em produção.
