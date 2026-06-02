# 🚀 M-Pesa SmartInfo - Frontend

Frontend moderno e consolidado com React + TypeScript + Tailwind CSS.

## 🎯 Features

- ✅ **Cores M-Pesa Consolidadas** (Vermelho, Verde, Branco)
- ✅ **Geolocalização Automática** do dispositivo
- ✅ **Seletor de Tempo Inteligente** (1-30 minutos)
- ✅ **API Centralizada** com tratamento de erros
- ✅ **Autenticação com Bearer Tokens**
- ✅ **Responsivo** (Mobile, Tablet, Desktop)
- ✅ **Performance Otimizada** (Vite + Tailwind)

## 📋 Pré-requisitos

- Node.js 16+ 
- npm ou yarn
- Backend rodando em `http://localhost:5000`

## 📦 Instalação

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/mpesa-smartinfo.git
cd mpesa-smartinfo/frontend
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
```bash
# Copiar arquivo de exemplo
cp .env.example .env.local

# Editar .env.local se necessário
cat .env.local
```

**Arquivo `.env.local`:**
```env
# API Base URL
VITE_API_URL=http://localhost:5000/api
```

### 4. Iniciar servidor de desenvolvimento
```bash
npm run dev
```

Acesse: `http://localhost:5173` (ou porta indicada)

## 🏗️ Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/           # Componentes reutilizáveis
│   │   ├── AgentCard.tsx     # Card de agente com cores M-Pesa
│   │   ├── ChatBox.tsx       # Chat com agente
│   │   ├── ReservationTimer.tsx # Timer com novo design
│   │   ├── StatusBadge.tsx   # Status online/offline
│   │   ├── BottomSheet.tsx   # Modal inferior
│   │   ├── PrimaryButton.tsx # Botão primário
│   │   ├── LoadingScreen.tsx # Tela de carregamento
│   │   └── [outros...]
│   ├── pages/                # Páginas da aplicação
│   │   ├── LandingPage.tsx   # Página inicial
│   │   ├── RegisterPage.tsx  # Registro de cliente
│   │   ├── MapPage.tsx       # Mapa com agentes
│   │   ├── ChatPage.tsx      # Chat com agente
│   │   ├── LoginPage.tsx     # Login agente/admin
│   │   ├── AgentPage.tsx     # Painel do agente
│   │   └── AdminPage.tsx     # Painel do admin
│   ├── services/             # Serviços de API
│   │   ├── apiClient.ts      # Cliente axios centralizado ⭐
│   │   ├── agentService.ts   # Endpoints de agente
│   │   ├── liquidityPingService.ts # Endpoints de ping
│   │   ├── authService.ts    # Endpoints de autenticação
│   │   └── [outros...]
│   ├── types.ts              # Tipos TypeScript
│   ├── App.tsx               # Componente raiz
│   ├── main.tsx              # Entry point
│   └── index.css             # Estilos globais
├── .env.local                # Variáveis de ambiente
├── .env.example              # Template de env
├── tailwind.config.js        # Configuração Tailwind
├── vite.config.ts            # Configuração Vite
├── tsconfig.json             # Configuração TypeScript
└── package.json              # Dependências

```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev                    # Inicia servidor Vite

# Build para produção
npm run build                  # Compila TypeScript + Vite
npm run preview               # Preview da build de produção

# Linting
npm run lint                   # ESLint (se configurado)
```

## 🎨 Customizando Cores M-Pesa

As cores estão definidas em `tailwind.config.js`:

```javascript
colors: {
  mpesaRed: "#E60000",         // Vermelho primário
  mpesaGreen: "#00A818",       // Verde de ação
  mpesaWhite: "#FFFFFF",       // Branco
  mpesaGray: "#4A4A4A",        // Cinzento
  // ...
}
```

Usar nos componentes:
```jsx
<button className="bg-mpesaRed hover:bg-mpesaRed/90">
  Enviar
</button>
```

## 📡 API Integration

### Cliente API Centralizado
Arquivo: `src/services/apiClient.ts`

Implementa:
- Configuração automática de baseURL via `.env.local`
- Interceptadores para autenticação
- Tratamento de erros automático
- Timeout de 15 segundos

### Exemplo de Uso
```typescript
import { fetchAgents, updateAgentStatus } from '@/services/agentService';
import { handleApiError } from '@/services/apiClient';

try {
  const agents = await fetchAgents();
  console.log(agents);
  
  await updateAgentStatus('123', { isActive: true });
} catch (error) {
  const message = handleApiError(error);
  console.error(message);
}
```

### Endpoints Disponíveis

**Agentes:**
- `GET /agents` - Listar todos
- `GET /agents/:id` - Buscar por ID
- `PATCH /agents/:id/status` - Atualizar status
- `POST /agents/:id/rate` - Avaliar

**Pings:**
- `GET /liquidity-pings` - Listar pings
- `POST /liquidity-pings` - Criar novo
- `PATCH /liquidity-pings/:id/accept` - Aceitar
- `PATCH /liquidity-pings/:id/reject` - Rejeitar
- `PATCH /liquidity-pings/:id/on-the-way` - Agente a caminho
- `PATCH /liquidity-pings/:id/arrived` - Chegou

**Autenticação:**
- `POST /agents/login` - Login agente
- `POST /agents/admin-login` - Login admin

Ver `API_DOCUMENTACAO.md` para detalhes completos.

## 🗺️ Geolocalização

A geolocalização é **automática** ao abrir o mapa:

1. **MapPage** solicita permissão ao navegador
2. **GPS ativado** obtém localização em tempo real
3. **Fallback** para Maputo se erro ou negado
4. **Botão verde** para atualizar localização

**Requisitos:**
- HTTPS em produção (funciona em localhost)
- Navegador moderno com suporte a Geolocation API
- Permissão do usuário

## ⏱️ Seletor de Tempo

Após confirmar agente, o cliente escolhe tempo até chegar:

- **Botões rápidos**: 5m, 10m, 15m, 20m, 25m, 30m
- **Input personalizado**: 1-30 minutos
- **Máximo**: 30 minutos (validado)
- **Cores**: Verde M-Pesa

## 📱 Responsividade

| Breakpoint | Tamanho | Exemplo |
|-----------|---------|---------|
| Mobile | < 640px | iPhone |
| Tablet | 640px - 1024px | iPad |
| Desktop | > 1024px | Monitor |

Testado com:
- Chrome, Firefox, Safari
- iOS Safari, Chrome Android

## 🔒 Autenticação

Usa Bearer Token JWT:

1. Login retorna `token`
2. Token armazenado em `localStorage`
3. Interceptador adiciona em requisições: `Authorization: Bearer <token>`
4. Token limpo ao fazer logout ou erro 401

## 🚨 Troubleshooting

### API não conecta
```bash
# Verificar se backend está rodando
curl http://localhost:5000/api/agents

# Verificar .env.local
cat .env.local
# VITE_API_URL=http://localhost:5000/api
```

### Geolocalização não funciona
- Certificar que está em HTTPS (produção)
- Verificar permissão do navegador
- Limpar cache (Ctrl+Shift+Del)
- Testar em outro navegador

### Cores não aparecem
```bash
# Limpar cache de desenvolvimento
rm -rf node_modules/.vite

# Rebuild
npm run build
npm run preview
```

### Erro de TypeScript
```bash
# Verificar tipos
npx tsc --noEmit

# Atualizar dependências
npm update
```

## 📊 Performance

**Métricas alvo:**
- First Contentful Paint: < 2s
- Largest Contentful Paint: < 3s
- Time to Interactive: < 4s
- Cumulative Layout Shift: < 0.1

**Otimizações:**
- Vite para bundling rápido
- Tailwind para CSS mínimo
- Lazy loading de componentes
- Code splitting automático

## 🔐 Segurança

- ✅ HTTPS em produção
- ✅ Validação de entrada
- ✅ CORS configurado
- ✅ Tokens JWT expiráveis
- ✅ Sem credenciais em localStorage (apenas token)

## 📚 Documentação Adicional

- [API_DOCUMENTACAO.md](../API_DOCUMENTACAO.md) - Detalhes de endpoints
- [MUDANCAS_IMPLEMENTADAS.md](../MUDANCAS_IMPLEMENTADAS.md) - Histórico de mudanças
- [RESUMO_EXECUTIVO.md](../RESUMO_EXECUTIVO.md) - Overview do projeto
- [TESTE_RAPIDO.md](../TESTE_RAPIDO.md) - Guia de testes

## 🤝 Contribuir

1. Fork o projeto
2. Criar branch (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licença

Propriedade da Vodacom M-Pesa

## 📞 Suporte

- Issues: GitHub Issues
- Email: support@mpesa.com
- Chat: Slack #mpesa-smartinfo

---

**Versão**: 2.0  
**Última atualização**: 30 de Maio de 2026  
**Status**: ✅ Pronto para Produção
