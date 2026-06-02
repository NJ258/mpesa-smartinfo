import { api, handleApiError } from './apiClient';

export interface LiquidityPing {
  id: string;
  clientName: string;
  clientPhone: string;
  agentId: string;
  agentName: string;
  amount: number;
  type: 'WITHDRAW' | 'DEPOSIT';
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'ON_THE_WAY' | 'ARRIVED' | 'EXPIRED';
  eta: string | null;
  createdAt: string;
}

export const fetchPings = async (agentId?: string): Promise<LiquidityPing[]> => {
  try {
    const params = agentId ? { agentId } : {};
    const response = await api.get('/liquidity-pings', { params });
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Formato inválido de resposta');
    }
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pings:', handleApiError(error));
    throw error;
  }
};

export const createPing = async (data: {
  clientName: string;
  clientPhone: string;
  agentId: string;
  amount: number;
  type: 'WITHDRAW' | 'DEPOSIT';
}): Promise<LiquidityPing> => {
  try {
    const response = await api.post('/liquidity-pings', data);
    if (!response.data?.ping) {
      throw new Error('Erro ao criar ping');
    }
    return response.data.ping;
  } catch (error) {
    console.error('Erro ao criar ping:', handleApiError(error));
    throw error;
  }
};

export const acceptPing = async (id: string): Promise<LiquidityPing> => {
  try {
    const response = await api.patch(`/liquidity-pings/${id}/accept`);
    if (!response.data?.ping) {
      throw new Error('Erro ao aceitar ping');
    }
    return response.data.ping;
  } catch (error) {
    console.error('Erro ao aceitar ping:', handleApiError(error));
    throw error;
  }
};

export const rejectPing = async (id: string): Promise<LiquidityPing> => {
  try {
    const response = await api.patch(`/liquidity-pings/${id}/reject`);
    if (!response.data?.ping) {
      throw new Error('Erro ao rejeitar ping');
    }
    return response.data.ping;
  } catch (error) {
    console.error('Erro ao rejeitar ping:', handleApiError(error));
    throw error;
  }
};

export const setOnTheWay = async (id: string, eta: string): Promise<LiquidityPing> => {
  try {
    const response = await api.patch(`/liquidity-pings/${id}/on-the-way`, { eta });
    if (!response.data?.ping) {
      throw new Error('Erro ao atualizar ETA');
    }
    return response.data.ping;
  } catch (error) {
    console.error('Erro ao atualizar ETA:', handleApiError(error));
    throw error;
  }
};

export const confirmArrival = async (id: string): Promise<LiquidityPing> => {
  try {
    const response = await api.patch(`/liquidity-pings/${id}/arrived`);
    if (!response.data?.ping) {
      throw new Error('Erro ao confirmar chegada');
    }
    return response.data.ping;
  } catch (error) {
    console.error('Erro ao confirmar chegada:', handleApiError(error));
    throw error;
  }
};

