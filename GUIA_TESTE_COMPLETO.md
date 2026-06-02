# 🎯 M-Pesa SmartInfo - Guia de Teste Completo

Bem-vindo ao M-Pesa SmartInfo! Este guia contém as instruções para testar toda a aplicação com dados reais.

## 📋 Conteúdo
1. [Credenciais de Teste](#credenciais-de-teste)
2. [Iniciando o Backend](#iniciando-o-backend)
3. [Iniciando o Frontend](#iniciando-o-frontend)
4. [Testando Cada Fluxo](#testando-cada-fluxo)
5. [Troubleshooting](#troubleshooting)

---

## 🔐 Credenciais de Teste

### Admin
- **Email:** `admin@test.com`
- **Senha:** `admin123`
- **Acesso:** Painel de administração para visualizar agentes, pings e operações

### Agente
- **Nome:** `Agente Teste`
- **Código:** `AG001`
- **Senha:** `agent123`
- **Localização:** Maputo Centro (-25.9655, 32.5832)
- **Status:** Online, com caixa e flutuante

### Cliente/Usuário
- **Telefone:** `840000000`
- **Nome:** Qualquer nome que inserir será registrado automaticamente
- **Acesso:** Mapa de agentes, chat, pedidos de levantamento/depósito

---

## 🚀 Iniciando o Backend

### 1. Pré-requisitos
- Node.js v16+
- PostgreSQL 12+
- `.env` configurado com `DATABASE_URL` e `JWT_SECRET`

### 2. Instalar dependências
```bash
cd backend
npm install
```

### 3. Executar Migrations
```bash
npx prisma migrate dev
```

### 4. Executar Seed com Dados de Teste
```bash
npx prisma db seed
```

Você deverá ver:
```
🌱 Iniciando seed do banco de dados...
✅ Dados antigos removidos
✅ Admin criado: admin@test.com
✅ Usuário criado: 840000000
✅ Agente criado: AG001 - Agente Teste

📊 Dados de teste criados com sucesso!
```

### 5. Iniciar servidor
```bash
npm run dev
```

Esperado:
```
✅ M-Pesa SmartInfo API rodando em http://localhost:5000
```

---

## 🎨 Iniciando o Frontend

### 1. Instalar dependências
```bash
cd frontend
npm install
```

### 2. Criar arquivo `.env.local`
```bash
VITE_API_URL=http://localhost:5000/api
```

### 3. Iniciar servidor de desenvolvimento
```bash
npm run dev
```

Esperado:
```
  VITE v5.4.1  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

---

## 🧪 Testando Cada Fluxo

### Fluxo 1: Cliente/Usuário
1. **Abra** `http://localhost:5173`
2. **Clique na aba "Cliente"** no painel de login
3. **Insira:**
   - Nome: `Seu Nome`
   - Telefone: `840000001` (ou qualquer número válido)
4. **Clique "Continuar"**
5. ✅ Você será redirecionado para o **Mapa de Agentes**

**O que testar no Mapa:**
- 📍 Clique no botão "Localizar" para usar geolocalização real do seu dispositivo
- 🔍 Procure o agente "Agente Teste" no mapa (verde)
- 👆 Clique no agente para iniciar um chat
- 💬 Solicite um levantamento/depósito

---

### Fluxo 2: Agente
1. **Abra** `http://localhost:5173/login`
2. **Clique na aba "Agente"**
3. **Insira:**
   - Nome: `Agente Teste`
   - Código: `AG001`
4. **Clique "Entrar"**
5. ✅ Você será redirecionado para o **Painel do Agente**

**O que testar no Painel:**
- 👁️ Veja o status online
- 📊 Verifique estatísticas (pings pendentes, em caminho, etc.)
- ✅ Aceite/Rejeite pedidos de clientes
- 🚗 Atualize ETA quando aceitar um pedido
- 📍 Configure sua localização e pontos de referência

---

### Fluxo 3: Admin
1. **Abra** `http://localhost:5173/login`
2. **Clique na aba "Admin"**
3. **Insira:**
   - Email: `admin@test.com`
   - Senha: `admin123`
4. **Clique "Entrar"**
5. ✅ Você será redirecionado para o **Painel de Administração**

**O que testar no Painel:**
- 📊 Visualize estatísticas gerais
- 👥 Veja lista de agentes
- 📍 Monitore pings em tempo real
- 🚑 Solicite reforços temporários

---

## 🔄 Fluxo Completo (End-to-End)

### Cenário de Teste Prático
1. **Abra 2 abas do navegador:**
   - Aba 1: Cliente
   - Aba 2: Agente

2. **Aba 1 (Cliente):**
   - Registre-se com nome e telefone
   - Localize o "Agente Teste" no mapa
   - Clique nele e solicite um levantamento de 500 MT

3. **Aba 2 (Agente):**
   - Faça login com code `AG001`
   - Veja o ping pendente
   - Clique "Aceitar"
   - Defina ETA para 10 minutos
   - Marque como "No Caminho"

4. **Aba 1 (Cliente):**
   - Veja a aceitação do agente
   - Veja o ETA atualizado
   - Veja confirmação de chegada

---

## 📡 Testando APIs Diretamente

### Registrar Novo Cliente
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"João Silva","phoneNumber":"847654321"}'
```

### Login do Agente
```bash
curl -X POST http://localhost:5000/api/agents/login \
  -H "Content-Type: application/json" \
  -d '{"name":"Agente Teste","code":"AG001"}'
```

### Login do Admin
```bash
curl -X POST http://localhost:5000/api/agents/admin-login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"admin123"}'
```

### Listar Agentes
```bash
curl http://localhost:5000/api/agents
```

### Criar Ping (Levantamento)
```bash
curl -X POST http://localhost:5000/api/liquidity-pings \
  -H "Content-Type: application/json" \
  -d '{
    "clientName":"Cliente Teste",
    "clientPhone":"840000000",
    "agentId":"<agent_id>",
    "amount":500,
    "type":"WITHDRAW"
  }'
```

---

## 🐛 Troubleshooting

### Frontend não consegue conectar ao backend
**Sintoma:** Erro "Sem resposta do servidor"
**Solução:**
1. Verifique se o backend está rodando em `http://localhost:5000`
2. Verifique `VITE_API_URL` no `.env.local`
3. Verifique CORS no `backend/src/app.ts`

### Geolocalização não funciona
**Sintoma:** Botão "Localizar" não faz nada
**Solução:**
1. Use navegador moderno (Chrome, Firefox, Safari)
2. Site deve ser HTTPS em produção (HTTP funciona em localhost)
3. Ative permissão de localização no navegador
4. Dispositivo deve ter GPS ativado

### Dados de seed não foram criados
**Sintoma:** Não consegue fazer login com credenciais de teste
**Solução:**
```bash
npx prisma db push
npx prisma db seed
```

### Porta 5000 ou 5173 já está em uso
**Solução:**
```bash
# Backend (trocar porta)
PORT=5001 npm run dev

# Frontend (Vite alterna automaticamente)
npm run dev -- --port 5174
```

---

## 📚 Recursos Úteis

- [Documentação Prisma](https://www.prisma.io/docs/)
- [Leaflet Maps](https://leafletjs.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Geolocation API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)

---

## ✅ Checklist de Verificação

- [ ] Backend iniciado e rodando em `localhost:5000`
- [ ] Frontend iniciado e rodando em `localhost:5173`
- [ ] Conseguiu fazer login como Cliente
- [ ] Conseguiu fazer login como Agente
- [ ] Conseguiu fazer login como Admin
- [ ] Geolocalização funcionando no mapa
- [ ] Conseguiu solicitar um levantamento/depósito
- [ ] Agente conseguiu aceitar/rejeitar
- [ ] ETA atualizado corretamente

---

**Última atualização:** 30 de maio de 2026  
**Versão:** 1.0.0
