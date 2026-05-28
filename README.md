# M-Pesa SmartInfo

M-Pesa SmartInfo é uma plataforma web criada para melhorar o acesso aos agentes M-Pesa em Moçambique.

A solução permite que utilizadores localizem agentes próximos, vejam se estão disponíveis, enviem pedidos de ajuda por bairro e acompanhem reforços temporários em zonas com alta procura.

## Problema

Muitas pessoas deslocam-se longas distâncias para procurar agentes M-Pesa e, ao chegar, encontram agentes fechados, sem dinheiro ou sem float.

## Solução

O sistema mostra agentes disponíveis no mapa, permite pedidos por zona e ajuda administradores a identificar locais onde há necessidade de reforço temporário.

## Funcionalidades

- Mapa com agentes M-Pesa
- Filtros por disponibilidade
- Painel do utilizador
- Painel do agente
- Painel administrativo
- Pedidos de ajuda por bairro
- Agente temporário
- Simulação SMS/USSD

## Tecnologias

### Frontend
- React
- Vite
- Axios
- React Router
- Leaflet

### Backend
- Node.js
- Express
- TypeScript

## Estrutura

```txt
mpesa-smartinfo/
├── frontend/
└── backend/

## Como Executar

backend

cd backend
npm install
npm run dev

frontend

cd frontend
npm install
npm run dev

## Objetivo

Contribuir para a inclusão financeira, ajudando utilizadores a encontrar agentes M-Pesa disponíveis de forma simples, rápida e acessível.