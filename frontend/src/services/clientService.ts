import { api, handleApiError } from './apiClient';
import type { ClientProfile } from '../types';

export const saveClient = async (profile: ClientProfile) => {
  try {
    const response = await api.post('/clients', profile);
    if (!response.data) {
      throw new Error('Erro ao salvar perfil do cliente');
    }
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar cliente:', handleApiError(error));
    throw error;
  }
};
