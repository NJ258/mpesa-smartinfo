import { api, handleApiError } from './apiClient';

export interface AgentLoginResponse {
  message: string;
  agent: {
    id: string;
    name: string;
    code: string;
    role: string;
  };
  token?: string;
}

export interface AdminLoginResponse {
  message: string;
  admin: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token?: string;
}

export interface UserRegisterResponse {
  message: string;
  user: {
    id: string;
    name: string;
    phoneNumber: string;
    role: string;
  };
}

export const registerUser = async (name: string, phoneNumber: string): Promise<UserRegisterResponse> => {
  try {
    const response = await api.post('/users/register', { name, phoneNumber });
    if (!response.data?.user) {
      throw new Error('Erro ao registrar usuário');
    }
    // Store user info if needed
    localStorage.setItem('smartinfo-user', JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar usuário:', handleApiError(error));
    throw error;
  }
};

export const loginAgent = async (name: string, agentCode: string): Promise<AgentLoginResponse> => {
  try {
    const response = await api.post('/agents/login', { name, code: agentCode });
    if (!response.data?.agent) {
      throw new Error('Credenciais inválidas');
    }
    // Store token if provided
    if (response.data.token) {
      localStorage.setItem('smartinfo-token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login de agente:', handleApiError(error));
    throw error;
  }
};

export const loginAdmin = async (email: string, password: string): Promise<AdminLoginResponse> => {
  try {
    const response = await api.post('/agents/admin-login', { email, password });
    if (!response.data?.admin) {
      throw new Error('Email ou senha inválidos');
    }
    // Store token if provided
    if (response.data.token) {
      localStorage.setItem('smartinfo-token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login de admin:', handleApiError(error));
    throw error;
  }
};

export const logout = (): void => {
  localStorage.removeItem('smartinfo-token');
  localStorage.removeItem('smartinfo-agent');
  localStorage.removeItem('smartinfo-admin');
  localStorage.removeItem('smartinfo-user');
};
