import { api, handleApiError } from './apiClient';
import type { Agent } from '../types';

const mapAgent = (a: any): Agent => ({
  id: String(a.id),
  name: a.name,
  status: a.isActive ? 'online' : 'offline',
  rating: a.rating || 5.0,
  landmark: a.referencePoint || 'Sem ponto de referência',
  neighborhood: a.location,
  online: a.isActive,
  temporary: false,
  distance: '450 m',
});

export const fetchAgents = async (): Promise<Agent[]> => {
  try {
    const response = await api.get('/agents');
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Formato inválido de resposta');
    }
    return response.data.map(mapAgent);
  } catch (error) {
    console.error('Erro ao buscar agentes:', handleApiError(error));
    throw error;
  }
};

export const fetchAgentById = async (id: string): Promise<Agent> => {
  try {
    const response = await api.get(`/agents/${id}`);
    if (!response.data) {
      throw new Error('Agente não encontrado');
    }
    return mapAgent(response.data);
  } catch (error) {
    console.error(`Erro ao buscar agente ${id}:`, handleApiError(error));
    throw error;
  }
};

export const updateAgentStatus = async (id: string, status: { isActive?: boolean; hasCash?: boolean; hasFloat?: boolean; referencePoint?: string }) => {
  try {
    const response = await api.patch(`/agents/${id}/status`, status);
    if (!response.data) {
      throw new Error('Erro ao atualizar status');
    }
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar status:', handleApiError(error));
    throw error;
  }
};

export const rateAgent = async (id: string, stars: number, comment?: string, clientPhone?: string) => {
  try {
    const response = await api.post(`/agents/${id}/rate`, { stars, comment, clientPhone });
    if (!response.data) {
      throw new Error('Erro ao enviar avaliação');
    }
    return response.data;
  } catch (error) {
    console.error('Erro ao avaliar agente:', handleApiError(error));
    throw error;
  }
};

