# 📡 Documentação de API - M-Pesa SmartInfo

## 🔧 Configuração de API

### Base URL
```
Desenvolvimento: http://localhost:5000/api
Produção: https://api.mpesa-smartinfo.com/api
```

### Cliente API Centralizado
Todas as requisições usam um cliente axios centralizado em `src/services/apiClient.ts`:

- ✅ Interceptadores de requisição/resposta
- ✅ Tratamento automático de erros
- ✅ Autenticação com Bearer token
- ✅ Timeout de 15 segundos
- ✅ Headers automáticos

## 📌 Endpoints de Agente

### 1. Buscar Todos os Agentes
```typescript
GET /agents

Response: Agent[]
{
  id: string;
  name: string;
  status: 'online' | 'offline';
  rating: number;
  landmark: string;
  neighborhood: string;
  online: boolean;
  temporary: boolean;
  distance: string;
}
```

**Uso:**
```typescript
import { fetchAgents } from '@/services/agentService';

try {
  const agents = await fetchAgents();
  console.log(agents);
} catch (error) {
  console.error('Erro ao buscar agentes');
}
```

---

### 2. Buscar Agente por ID
```typescript
GET /agents/:id

Response: Agent (mesmo schema acima)
```

**Uso:**
```typescript
import { fetchAgentById } from '@/services/agentService';

const agent = await fetchAgentById('123');
```

---

### 3. Atualizar Status do Agente
```typescript
PATCH /agents/:id/status

Request:
{
  isActive?: boolean;           // Online/Offline
  hasCash?: boolean;            // Tem dinheiro
  hasFloat?: boolean;           // Tem troco
  referencePoint?: string;      // Ponto de referência
}

Response: { success: true }
```

**Uso:**
```typescript
import { updateAgentStatus } from '@/services/agentService';

await updateAgentStatus('123', {
  isActive: true,
  referencePoint: 'Perto do banco azul'
});
```

---

### 4. Avaliar Agente
```typescript
POST /agents/:id/rate

Request:
{
  stars: number (1-5);
  comment?: string;
  clientPhone?: string;
}

Response: { success: true }
```

**Uso:**
```typescript
import { rateAgent } from '@/services/agentService';

await rateAgent('123', 5, 'Excelente atendimento', '84123456');
```

---

## 🔔 Endpoints de Liquidity Ping

### 1. Buscar Pings
```typescript
GET /liquidity-pings?agentId=123

Response: LiquidityPing[]
{
  id: string;
  clientName: string;
  clientPhone: string;
  agentId: number;
  agentName: string;
  amount: number;
  type: 'WITHDRAW' | 'DEPOSIT';
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'ON_THE_WAY' | 'ARRIVED' | 'EXPIRED';
  eta: string | null;
  createdAt: string;
}
```

**Uso:**
```typescript
import { fetchPings } from '@/services/liquidityPingService';

// Buscar todos
const allPings = await fetchPings();

// Buscar de um agente específico
const agentPings = await fetchPings(123);
```

---

### 2. Criar Novo Ping
```typescript
POST /liquidity-pings

Request:
{
  clientName: string;
  clientPhone: string;
  agentId: number;
  amount: number;
  type: 'WITHDRAW' | 'DEPOSIT';
}

Response:
{
  ping: LiquidityPing;
}
```

**Uso:**
```typescript
import { createPing } from '@/services/liquidityPingService';

const ping = await createPing({
  clientName: 'João Silva',
  clientPhone: '84123456',
  agentId: 123,
  amount: 2000,
  type: 'WITHDRAW'
});
```

---

### 3. Aceitar Ping
```typescript
PATCH /liquidity-pings/:id/accept

Response:
{
  ping: LiquidityPing (status: 'ACCEPTED')
}
```

**Uso:**
```typescript
import { acceptPing } from '@/services/liquidityPingService';

await acceptPing('ping-123');
```

---

### 4. Rejeitar Ping
```typescript
PATCH /liquidity-pings/:id/reject

Response:
{
  ping: LiquidityPing (status: 'REJECTED')
}
```

**Uso:**
```typescript
import { rejectPing } from '@/services/liquidityPingService';

await rejectPing('ping-123');
```

---

### 5. Atualizar ETA (Agente a caminho)
```typescript
PATCH /liquidity-pings/:id/on-the-way

Request:
{
  eta: string; // "15 min", "20 min", etc
}

Response:
{
  ping: LiquidityPing (status: 'ON_THE_WAY')
}
```

**Uso:**
```typescript
import { setOnTheWay } from '@/services/liquidityPingService';

await setOnTheWay('ping-123', '15 min');
```

---

### 6. Confirmar Chegada
```typescript
PATCH /liquidity-pings/:id/arrived

Response:
{
  ping: LiquidityPing (status: 'ARRIVED')
}
```

**Uso:**
```typescript
import { confirmArrival } from '@/services/liquidityPingService';

await confirmArrival('ping-123');
```

---

## 🔐 Endpoints de Autenticação

### 1. Login Agente
```typescript
POST /agents/login

Request:
{
  name: string;
  code: string;
}

Response:
{
  message: string;
  agent: {
    id: string;
    name: string;
    code: string;
    role: string;
  };
  token?: string;  // JWT para futuras requisições
}
```

**Uso:**
```typescript
import { loginAgent } from '@/services/authService';

const { agent, token } = await loginAgent('João Silva', 'AG-12345');
localStorage.setItem('smartinfo-token', token);
```

---

### 2. Login Admin
```typescript
POST /agents/admin-login

Request:
{
  email: string;
  password: string;
}

Response:
{
  message: string;
  admin: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token?: string;  // JWT para futuras requisições
}
```

**Uso:**
```typescript
import { loginAdmin } from '@/services/authService';

const { admin, token } = await loginAdmin('admin@mpesa.com', 'senha123');
localStorage.setItem('smartinfo-token', token);
```

---

## ⚙️ Tratamento de Erros

### Exemplo de Erro
```typescript
try {
  await fetchAgents();
} catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      // Não autenticado
      console.log('Faça login novamente');
    } else if (error.response?.status === 404) {
      // Não encontrado
      console.log('Recurso não existe');
    } else if (error.request) {
      // Sem resposta do servidor
      console.log('Sem conexão com servidor');
    }
  }
}
```

### Função Helper
```typescript
import { handleApiError } from '@/services/apiClient';

try {
  await fetchAgents();
} catch (error) {
  const message = handleApiError(error);
  console.error(message);
  // "Erro 500: Internal Server Error"
  // ou "Sem resposta do servidor. Verifique sua conexão."
}
```

---

## 🔑 Autenticação com Tokens

### Como Funciona
1. Login retorna um `token` JWT
2. Token é armazenado em `localStorage`
3. Interceptador automático adiciona `Authorization: Bearer <token>` em todas as requisições
4. Se 401 for retornado, token é limpo automaticamente

### Headers Automáticos
```
GET /agents HTTP/1.1
Host: localhost:5000
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json
Accept: application/json
```

---

## 🚀 Variáveis de Ambiente

### `.env.local` (Desenvolvimento)
```bash
VITE_API_URL=http://localhost:5000/api
```

### `.env.production` (Produção)
```bash
VITE_API_URL=https://api.mpesa-smartinfo.com/api
```

### Como usar no código
```typescript
const baseURL = import.meta.env.VITE_API_URL;
```

---

## 📊 Status HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Sucesso |
| 201 | Created - Criado |
| 400 | Bad Request - Dados inválidos |
| 401 | Unauthorized - Não autenticado |
| 403 | Forbidden - Sem permissão |
| 404 | Not Found - Não encontrado |
| 500 | Server Error - Erro no servidor |

---

## ✅ Checklist de Integração

- [ ] Variável `VITE_API_URL` configurada no `.env.local`
- [ ] Client API centralizado em uso
- [ ] Todos os serviços importam do `apiClient`
- [ ] Tratamento de erros implementado
- [ ] Autenticação com tokens funcionando
- [ ] Interceptadores de requisição/resposta testados
- [ ] Sem erros 404 ou 500 no console

---

## 🔗 Links Úteis

- [Documentação Axios](https://axios-http.com/)
- [Vite Env Variables](https://vitejs.dev/guide/env-and-modes.html)
- [Bearer Token Authentication](https://tools.ietf.org/html/rfc6750)
