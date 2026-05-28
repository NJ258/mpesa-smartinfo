export type AgentState = 'online' | 'offline' | 'temp-approaching' | 'temp-ready';

export interface Agent {
  id: string;
  name: string;
  status: AgentState;
  rating: number;
  landmark: string;
  neighborhood: string;
  online: boolean;
  temporary: boolean;
  distance: string;
}

export interface ClientProfile {
  name: string;
  phone: string;
}

export interface RequestItem {
  id: string;
  client: string;
  agentId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'on-the-way' | 'arrived';
  type: 'Levantamento' | 'Depósito';
  amount: string;
  eta?: string;
}
