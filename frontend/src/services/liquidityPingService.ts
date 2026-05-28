import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export interface LiquidityPing {
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

export const fetchPings = async (agentId?: number): Promise<LiquidityPing[]> => {
  const params = agentId ? { agentId } : {};
  const response = await api.get('/liquidity-pings', { params });
  return response.data;
};

export const createPing = async (data: {
  clientName: string;
  clientPhone: string;
  agentId: number;
  amount: number;
  type: 'WITHDRAW' | 'DEPOSIT';
}): Promise<LiquidityPing> => {
  const response = await api.post('/liquidity-pings', data);
  return response.data.ping;
};

export const acceptPing = async (id: string): Promise<LiquidityPing> => {
  const response = await api.patch(`/liquidity-pings/${id}/accept`);
  return response.data.ping;
};

export const rejectPing = async (id: string): Promise<LiquidityPing> => {
  const response = await api.patch(`/liquidity-pings/${id}/reject`);
  return response.data.ping;
};

export const setOnTheWay = async (id: string, eta: string): Promise<LiquidityPing> => {
  const response = await api.patch(`/liquidity-pings/${id}/on-the-way`, { eta });
  return response.data.ping;
};

export const confirmArrival = async (id: string): Promise<LiquidityPing> => {
  const response = await api.patch(`/liquidity-pings/${id}/arrived`);
  return response.data.ping;
};

