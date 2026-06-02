# 🚀 Guia Rápido de Testes

## ⚡ Como Executar o Projeto

### 1. Navegar até a pasta frontend
```bash
cd mpesa-smartinfo/frontend
```

### 2. Instalar dependências (primeira vez)
```bash
npm install
```

### 3. Rodar o servidor de desenvolvimento
```bash
npm run dev
```

O projeto abrirá em `http://localhost:5173` (ou similar)

## 🧪 Testes Rápidos

### ✅ Teste 1: Cores M-Pesa (2 minutos)
1. Abrir a página inicial
2. Verificar:
   - Logo M em **vermelho** (#E60000)
   - Botão "Procurar Agentes" em **vermelho**
   - Botão "Área do Agente" em **branco/cinzento**
   - Status online em **verde** (#00A818)

**Resultado esperado**: ✅ Cores visíveis em vermelho, verde e branco

---

### ✅ Teste 2: Geolocalização (3 minutos)
1. Clicar em "Procurar Agentes"
2. Preencher nome e telefone
3. Clicar "Ver Agentes Próximos"
4. **Verificar**:
   - MapPage deve carregar
   - Pedir permissão de localização (popup do navegador)
   - Deve pedir "Permitir" → Clicar **Permitir**
   - Mapa deve centralizar sua localização em 5-10 segundos
   - Botão "Usar Minha Localização" em **verde**

**Resultado esperado**: ✅ Mapa carrega com sua localização

---

### ✅ Teste 3: Seletor de Tempo (ETA) (4 minutos)
1. Do mapa, clicar em qualquer **agente verde** (online)
2. Escolher operação: "Levantamento" ou "Depósito"
3. Digitar valor (ex: 2000)
4. Clicar "Enviar pedido ao agente"
5. Aguardar confirmação (~ 1-2 segundos)
6. Clicar "Estou a caminho"
7. **Verificar ETA**:
   - Deve aparecer **6 botões**: 5m, 10m, 15m, 20m, 25m, 30m
   - Cores **verde M-Pesa** nos botões
   - ❌ **NÃO deve** aparecer "+15 min"
   - Campo abaixo permite digitar valor 1-30

**Resultado esperado**: ✅ Seletor com cores verde, sem "+15 min"

---

### ✅ Teste 4: ReservationTimer (2 minutos)
1. Do teste anterior, escolher um tempo (ex: 15m)
2. **Verificar timer**:
   - Design com fundo **verde claro M-Pesa**
   - Timer mostra MM:SS (ex: 15:00)
   - **2 botões**: "Menos" e "Mais"
   - Botão "Menos" reduz 5 min
   - Botão "Mais" aumenta 5 min
   - Campo no meio mostra minutos atuais
   - Máximo de 30 minutos (botão "Mais" desativa quando atinge 30)

**Resultado esperado**: ✅ Timer com novo design verde M-Pesa

---

### ✅ Teste 5: Componentes Coloridos (2 minutos)
1. Voltar ao mapa
2. **Verificar**:
   - AgentCard tem **borda verde** ao passar mouse
   - Agente online = badge **verde**
   - Agente offline = badge **vermelho**
   - Distância = badge com fundo **verde claro**
   - Estrelas = amarelas (avaliação)

**Resultado esperado**: ✅ Cores vermelha, verde e branca em todos os componentes

---

### ✅ Teste 6: Navegação (2 minutos)
1. **Desktop**: Clicar em "Início", "Procurar Agentes", "Área do Agente"
2. **Mobile** (F12 → Responsive): Verificar bottom nav com ícones
3. **Verificar**:
   - Link ativo em **vermelho**
   - Hover em **vermelho**
   - Cores consistentes

**Resultado esperado**: ✅ Navegação com cores M-Pesa

---

## 📊 Checklist de Validação

```
✅ Cores M-Pesa (vermelho, verde, branco)
   [ ] Logo vermelho
   [ ] Botões vermelhos
   [ ] Buttons secundários verdes
   [ ] Status online verde

✅ Geolocalização
   [ ] MapPage pede permissão
   [ ] Mapa centra na posição
   [ ] Botão verde "Usar Minha Localização"

✅ Seletor ETA
   [ ] 6 botões de tempo (5-30 min)
   [ ] Sem "+15 min"
   [ ] Campo de input personalizado
   [ ] Cores verdes

✅ ReservationTimer
   [ ] Design novo com cores verdes
   [ ] Botões +/- funcionam
   [ ] Timer em MM:SS
   [ ] Máximo 30 min

✅ Interface Geral
   [ ] Todas as páginas coloridas
   [ ] Sem erros no console
   [ ] Responsivo (mobile, tablet, desktop)
```

## 🔍 Verificar Console (F12)

```javascript
// Abrir DevTools: F12
// Aba: Console
// Não deve haver erros vermelhos (warnings são OK)
```

## 🎯 Resultado Final

Se todos os testes passarem ✅:

```
✅ Frontend bem consolidado com cores M-Pesa
✅ Geolocalização automática do dispositivo
✅ Seletor de tempo inteligente (1-30 minutos)
✅ Sem "+15 min" genérico
✅ Interface consistente em todas as telas
```

## ⏱️ Tempo Total de Testes: ~15 minutos

---

**Dúvidas?** Verificar `GUIA_TESTES.md` para testes mais completos
