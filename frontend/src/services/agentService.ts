import axios from 'axios';
import type { Agent } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});


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
  const response = await api.get('/agents');
  return response.data.map(mapAgent);
};

export const fetchAgentById = async (id: string): Promise<Agent> => {
  const response = await api.get(`/agents/${id}`);
  return mapAgent(response.data);
};

export const updateAgentStatus = async (id: string, status: { isActive?: boolean; hasCash?: boolean; hasFloat?: boolean; referencePoint?: string }) => {
  const response = await api.patch(`/agents/${id}/status`, status);
  return response.data;
};

export const rateAgent = async (id: string, stars: number, comment?: string, clientPhone?: string) => {
  const response = await api.post(`/agents/${id}/rate`, { stars, comment, clientPhone });
  return response.data;
};

