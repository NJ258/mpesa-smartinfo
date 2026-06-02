# M-Pesa SmartInfo

Plataforma web moderna para conectar clientes a agentes M-Pesa em Moçambique.

## 🎯 Visão Geral

M-Pesa SmartInfo resolve o problema de clientes que viajam longas distâncias para encontrar agentes M-Pesa que estão fechados ou sem fundos. Com geolocalização automática, mapa interativo e comunicação em tempo real, o acesso a serviços M-Pesa fica mais fácil e confiável.

## 🚀 Features Principais

### 🎨 Interface Consolidada
- ✅ **Cores M-Pesa** (Vermelho #E60000, Verde #00A818, Branco)
- ✅ **Responsivo** (Mobile, Tablet, Desktop)
- ✅ **Performance** (< 3s load time com Vite)
- ✅ **Acessível** (WCAG compliant)

### 🗺️ Geolocalização
- ✅ **Automática** ao abrir o mapa
- ✅ **Tempo real** com GPS do dispositivo
- ✅ **Fallback** para localização padrão
- ✅ **Compatível** com iOS, Android, Desktop

### ⏱️ Seletor de Tempo Inteligente
- ✅ **1-30 minutos** (sem "+15 genérico")
- ✅ **Botões rápidos** (5, 10, 15, 20, 25, 30 min)
- ✅ **Input personalizado** para qualquer tempo
- ✅ **Validação** automática e feedback visual

### 📡 API Centralizada
- ✅ **Cliente axios** único ponto de entrada
- ✅ **Interceptadores** para auth/erros
- ✅ **Tratamento robusto** de erros
- ✅ **Bearer tokens** JWT automáticos
- ✅ **Variáveis de ambiente** para dev/prod

### 👥 Tipos de Usuários
1. **Cliente** - Procura agentes e faz pedidos
2. **Agente** - Recebe pedidos e atualiza status
3. **Admin** - Gerencia agentes e sistema

## 📋 Pré-requisitos

```bash
Node.js 16+
npm ou yarn
Backend rodando em http://localhost:5000
HTTPS (produção)
```

## 📦 Instalação

### 1. Clonar
```bash
git clone https://github.com/vodacom/mpesa-smartinfo.git
cd mpesa-smartinfo
```

### 2. Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

### 3. Backend
```bash
cd ../backend
npm install
npm run dev
```

Acesse: `http://localhost:5173`

## 🏗️ Estrutura

```
mpesa-smartinfo/
├── frontend/                 # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── pages/            # Páginas (7 telas)
│   │   ├── services/         # Serviços de API
│   │   ├── types.ts          # Tipos TypeScript
│   │   └── App.tsx
│   ├── .env.local            # Configuração local
│   ├── tailwind.config.js    # Cores M-Pesa
│   └── README.md             # Docs frontend
│
├── backend/                  # Node.js + Express
│   ├── src/
│   │   ├── controllers/      # Lógica de negócio
│   │   ├── routes/           # Endpoints
│   │   ├── models/           # Schemas Prisma
│   │   └── middleware/       # Auth, logs, etc
│   ├── prisma/
│   │   └── schema.prisma     # Database
│   └── README.md             # Docs backend
│
├── API_DOCUMENTACAO.md       # Endpoints detalhados
├── MUDANCAS_IMPLEMENTADAS.md # Histórico
├── RESUMO_EXECUTIVO.md       # Overview
└── README.md                 # Este arquivo
```

## 🔌 Endpoints de API

### Agentes
```
GET    /api/agents              # Listar todos
GET    /api/agents/:id          # Buscar por ID
PATCH  /api/agents/:id/status   # Atualizar status
POST   /api/agents/:id/rate     # Avaliar
```

### Pings
```
GET    /api/liquidity-pings              # Listar
POST   /api/liquidity-pings              # Criar
PATCH  /api/liquidity-pings/:id/accept   # Aceitar
PATCH  /api/liquidity-pings/:id/reject   # Rejeitar
PATCH  /api/liquidity-pings/:id/on-the-way  # A caminho
PATCH  /api/liquidity-pings/:id/arrived     # Chegou
```

### Autenticação
```
POST   /api/agents/login        # Login agente
POST   /api/agents/admin-login  # Login admin
```

Detalhes: Ver `API_DOCUMENTACAO.md`

## 🎯 Fluxos de Uso

### Cliente
1. Registra nome e telefone
2. MapPage carrega com geolocalização **automática**
3. Vê agentes próximos (online/offline)
4. Clica em agente → chat
5. Escolhe operação + valor
6. Agente confirma via chat
7. Clica "Estou a caminho"
8. Escolhe tempo **1-30 min** (não "+15")
9. ReservationTimer com novo design
10. Avalia agente

### Agente
1. Faz login com nome + código
2. AgentPage com botão **verde** online/offline
3. Recebe pings em tempo real
4. Aceita/rejeita pedidos
5. Atualiza ponto de referência
6. Status em tempo real

### Admin
1. Login com email + senha
2. Dashboard com estatísticas
3. Gerencia agentes e usuários
4. Relatórios e análises

## 🎨 Cores e Design

### Paleta M-Pesa
```
Vermelho:  #E60000 - Primário, ações, destacado
Verde:     #00A818 - Sucesso, online, secundário
Branco:    #FFFFFF - Fundo, contraste
Cinzento:  #4A4A4A - Texto, neutro
```

### Componentes
- **PrimaryButton** - Vermelho com gradient
- **AgentCard** - Borda verde ao hover
- **ReservationTimer** - Novo design verde
- **StatusBadge** - Verde/Vermelho M-Pesa
- **ChatBox** - Footer verde claro
- **LoadingScreen** - Spinner com cores alternadas

## 📱 Responsividade

| Device | Status | Notas |
|--------|--------|-------|
| Mobile | ✅ | Bottom nav com ícones |
| Tablet | ✅ | Layout equilibrado |
| Desktop | ✅ | Grid de 3+ colunas |
| iOS | ✅ | HTTPS necessário |
| Android | ✅ | Chrome, Firefox, etc |

## ⚙️ Configuração

### Variáveis de Ambiente

**`.env.local` (Desenvolvimento)**
```env
VITE_API_URL=http://localhost:5000/api
```

**`.env.production` (Produção)**
```env
VITE_API_URL=https://api.mpesa-smartinfo.com/api
```

### Tailwind Colors

Editar em `frontend/tailwind.config.js`:
```javascript
colors: {
  mpesaRed: "#E60000",
  mpesaGreen: "#00A818",
  mpesaWhite: "#FFFFFF",
  // ...
}
```

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
vercel deploy
```

### Backend (Heroku)
```bash
git push heroku main
```

### Variáveis de Ambiente (Produção)
```
VITE_API_URL=https://api.mpesa-smartinfo.com/api
DATABASE_URL=postgresql://...
JWT_SECRET=seu-secret-aqui
```

## 🧪 Testes

```bash
# Testes rápidos (15 min)
npm run test:quick

# Testes completos
npm run test

# Coverage
npm run test:coverage
```

Ver `TESTE_RAPIDO.md` para guia detalhado

## 📊 Performance

**Métricas:**
- First Contentful Paint: < 2s
- Largest Contentful Paint: < 3s
- Time to Interactive: < 4s
- Cumulative Layout Shift: < 0.1

**Otimizações:**
- Vite bundling
- Tailwind CSS minificado
- Code splitting automático
- Lazy loading de componentes
- Compressão gzip

## 🔐 Segurança

- ✅ HTTPS em produção
- ✅ CORS configurado
- ✅ JWT Bearer tokens
- ✅ Validação de entrada
- ✅ Rate limiting
- ✅ Sanitização de dados

## 📚 Documentação

| Arquivo | Conteúdo |
|---------|----------|
| `API_DOCUMENTACAO.md` | Endpoints completos |
| `MUDANCAS_IMPLEMENTADAS.md` | Histórico de mudanças |
| `RESUMO_EXECUTIVO.md` | Overview do projeto |
| `TESTE_RAPIDO.md` | Guia de testes |
| `frontend/README.md` | Docs do frontend |
| `backend/README.md` | Docs do backend |

## 🐛 Troubleshooting

```bash
# API não conecta
curl http://localhost:5000/api/agents

# Porta já em uso
lsof -i :5173

# Cache Tailwind
rm -rf node_modules/.vite

# Reset completo
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contribuir

1. Fork o projeto
2. Criar branch (`git checkout -b feature/X`)
3. Commit (`git commit -m 'Add feature X'`)
4. Push (`git push origin feature/X`)
5. Pull Request

## 📄 Licença

© 2026 Vodacom M-Pesa - Todos os direitos reservados

## 👥 Autores

- **Team M-Pesa SmartInfo**
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: PostgreSQL + Prisma

## 📞 Suporte

- 📧 Email: support@mpesa.com
- 💬 Chat: Slack #mpesa-smartinfo
- 🐛 Issues: GitHub Issues

---

**Versão**: 2.0  
**Status**: ✅ Pronto para Produção  
**Última atualização**: 30 de Maio de 2026

cd backend
npm install
npm run dev

frontend

cd frontend
npm install
npm run dev

## Objetivo

Contribuir para a inclusão financeira, ajudando utilizadores a encontrar agentes M-Pesa disponíveis de forma simples, rápida e acessível. 