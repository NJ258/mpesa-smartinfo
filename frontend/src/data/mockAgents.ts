import type { Agent, RequestItem } from '../types';

export const mockAgents: Agent[] = [
  {
    id: 'agent-01',
    name: 'Ana Santos',
    status: 'online',
    rating: 4.9,
    landmark: 'Perto da banca azul',
    neighborhood: 'Polana Cimento',
    online: true,
    temporary: false,
    distance: '450 m'
  },
  {
    id: 'agent-02',
    name: 'Carlos M.',
    status: 'offline',
    rating: 4.6,
    landmark: 'Frente ao mercado central',
    neighborhood: 'Fórum de Maputo',
    online: false,
    temporary: false,
    distance: '1.2 km'
  },
  {
    id: 'agent-03',
    name: 'Miguel',
    status: 'temp-approaching',
    rating: 4.5,
    landmark: 'Ao lado da bomba de gasolina',
    neighborhood: 'Xikhelene',
    online: false,
    temporary: true,
    distance: '600 m'
  },
  {
    id: 'agent-04',
    name: 'Lúcia',
    status: 'temp-ready',
    rating: 4.8,
    landmark: 'Em frente ao mini-mercado',
    neighborhood: 'Zimpeto',
    online: false,
    temporary: true,
    distance: '900 m'
  }
];

export const mockRequests: RequestItem[] = [
  {
    id: 'req-101',
    client: 'João',
    agentId: 'agent-01',
    status: 'pending',
    type: 'Levantamento',
    amount: '2000 MT'
  },
  {
    id: 'req-102',
    client: 'Maria',
    agentId: 'agent-01',
    status: 'on-the-way',
    type: 'Depósito',
    amount: '1500 MT',
    eta: '10 min'
  }
];
