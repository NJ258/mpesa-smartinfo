import { api, handleApiError } from './apiClient';

export const requestTemporaryAgent = async (targetLocation: string, latitude: number, longitude: number) => {
  try {
    const response = await api.post('/temporary-agents', { targetLocation, latitude, longitude });
    if (!response.data) {
      throw new Error('Erro ao solicitar agente temporário');
    }
    return response.data;
  } catch (error) {
    console.error('Erro ao solicitar agente temporário:', handleApiError(error));
    throw error;
  }
};

