# 🧪 Guia de Testes - M-Pesa SmartInfo

## ✅ Verificações de Cores M-Pesa

### Paleta Visual
- [ ] **Vermelho** (#E60000): Botões primários, títulos, ícones ativos
- [ ] **Verde** (#00A818): Botões secundários, status online, seletor ETA
- [ ] **Branco** (#FFFFFF): Fundo principal, componentes
- [ ] **Cinzento**: Texto, bordas, elementos neutros

## 🗺️ Teste de Geolocalização

### Pré-requisitos
1. Abrir a página em HTTPS (para geolocalização funcionar)
2. Permitir acesso à localização do navegador
3. Ter GPS/localização ativado no dispositivo

### Testes
- [ ] **MapPage carrega e solicita localização automaticamente**
  - Abrir `/map` e deve pedir permissão
  - Mapa deve centralizar na sua localização em 5-10 segundos
  
- [ ] **Botão "Usar Minha Localização" funciona**
  - Clicar no botão verde
  - Deve aparecer spinner enquanto localiza
  - Mapa deve atualizar com nova posição

- [ ] **Pesquisa por bairro funciona**
  - Digitar "Polana Cimento", "Zimpeto", "Xikhelene"
  - Mapa deve deslocar-se para o bairro procurado

## ⏱️ Teste do Seletor de Tempo (1-30 minutos)

### ReservationTimer (durante reserva ativa)
- [ ] **Display mostra tempo em MM:SS**
- [ ] **Botão "Menos" diminui 5 minutos (mínimo 1)**
- [ ] **Botão "Mais" aumenta 5 minutos (máximo 30)**
- [ ] **Campo no meio mostra tempo atual selecionado**
- [ ] **Cores verde M-Pesa aplicadas corretamente**

### ChatPage - Seletor ETA (após "Estou a caminho")
- [ ] **Aparecem botões: 5m, 10m, 15m, 20m, 25m, 30m**
- [ ] **Sem botão "+15 min" (foi removido)**
- [ ] **Campo de entrada personalizada funciona**
  - Digitar valor entre 1-30 minutos
  - Clicar "OK" confirma
  - Limite máximo de 30 min é respeitado
- [ ] **Cores verde M-Pesa no seletor**

## 🎨 Teste da Interface Consolidada

### Componentes Principais
- [ ] **PrimaryButton**: Vermelho com gradient, shadow melhorado
- [ ] **AgentCard**: Bordas verde M-Pesa ao hover, ícones coloridos
- [ ] **ChatBox**: Footer com fundo verde claro M-Pesa
- [ ] **ReservationTimer**: Design novo com botões +/-
- [ ] **StatusBadge**: Verde para online, vermelho para offline
- [ ] **LoadingScreen**: Spinner com cores M-Pesa alternadas

### Navbar
- [ ] **Logo "M" vermelho M-Pesa**
- [ ] **Links ativos em vermelho com underline**
- [ ] **Status online com ponto verde M-Pesa (pulse)**
- [ ] **Status offline em vermelho**

### Páginas
- [ ] **LandingPage**: Glow vermelho ao fundo, botões coloridos
- [ ] **RegisterPage**: Barra superior vermelho M-Pesa
- [ ] **LoginPage**: Barra superior vermelho M-Pesa
- [ ] **MapPage**: Botão localização verde, cores consolidadas
- [ ] **ChatPage**: Cores vermelho/verde M-Pesa
- [ ] **AgentPage**: Botão online verde M-Pesa

## 📱 Teste Responsividade

- [ ] **Mobile (< 640px)**
  - Bottom nav mostra ícones corretos
  - Componentes se adaptam bem
  - Cores visíveis em tela pequena

- [ ] **Tablet (640px - 1024px)**
  - Layout equilibrado
  - Botões e campos acessíveis
  - Sem overflow de conteúdo

- [ ] **Desktop (> 1024px)**
  - Grid layout funciona
  - Espaçamento adequado
  - Hover states visíveis

## 🔄 Teste de Fluxo Completo

### Cliente
1. [ ] Abrir app → LandingPage
2. [ ] Clicar "Procurar Agentes"
3. [ ] Registrar nome e telefone
4. [ ] MapPage com geolocalização automática ✓
5. [ ] Procurar agente no mapa
6. [ ] Clicar agente → ChatPage
7. [ ] Escolher operação (Levantamento/Depósito)
8. [ ] Digitar valor
9. [ ] Enviar pedido
10. [ ] Aguardar confirmação
11. [ ] Clicar "Estou a caminho"
12. [ ] Seletor ETA com cores verde ✓ (sem "+15")
13. [ ] Escolher tempo 1-30 min ✓
14. [ ] Reservação com timer ✓
15. [ ] Clicar "Cheguei"
16. [ ] Avaliar agente
17. [ ] Voltar ao mapa

### Agente
1. [ ] Abrir app → LoginPage
2. [ ] Fazer login com credenciais
3. [ ] AgentPage com botão verde "Online" ✓
4. [ ] Clicar botão para ativar/desativar
5. [ ] Receber pings de clientes
6. [ ] Aceitar/Rejeitar pedidos
7. [ ] Botão verde M-Pesa funciona

## 🎯 Checklist Final

- [ ] Todas as cores M-Pesa aplicadas (vermelho, verde, branco)
- [ ] Geolocalização automática funciona
- [ ] Seletor ETA removeu o "+15" e tem 1-30 min
- [ ] ReservationTimer com novo design verde
- [ ] Frontend consolidado e consistente
- [ ] Sem erros no console
- [ ] Performance aceitável (<3s load time)
- [ ] Sem warnings TypeScript

## 🐛 Possíveis Issues

Se encontrar problemas:
1. **Geolocalização não funciona**: Verificar se está em HTTPS
2. **Cores não aparecem**: Limpar cache (Ctrl+Shift+Delete)
3. **Tailwind classes não aplicam**: Rodar `npm run build`
4. **Seletor ETA quebrado**: Verificar console para erros

## 📊 Performance

- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 3s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Time to Interactive < 4s

---

**Data de Teste**: ___________  
**Testado por**: ___________  
**Status**: ✅ Passou / ❌ Falhou
