import axios, { AxiosInstance, AxiosError } from 'axios';

const getBaseURL = (): string => {
  // For development
  if (import.meta.env.DEV) {
    const apiURL = import.meta.env.VITE_API_URL as string | undefined;
    if (apiURL) return apiURL;
    
    // Se estiver a aceder pelo telemóvel na mesma rede local,
    // o hostname será o IP do computador (ex: 192.168.x.x)
    const hostname = window.location.hostname;
    return `http://${hostname}:5000/api`;
  }
  // For production
  return (import.meta.env.VITE_API_URL as string | undefined) || `${window.location.origin}/api`;
};

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: getBaseURL(),
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Add request interceptor for auth tokens
    this.instance.interceptors.request.use(
      (config: any) => {
        const token = localStorage.getItem('smartinfo-token');
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for error handling
    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Unauthorized - clear auth data
          localStorage.removeItem('smartinfo-token');
          localStorage.removeItem('smartinfo-agent');
          localStorage.removeItem('smartinfo-admin');
        }
        return Promise.reject(error);
      }
    );
  }

  getClient(): AxiosInstance {
    return this.instance;
  }
}

export const apiClient = new ApiClient();
export const api = apiClient.getClient();

// Generic error handler
export const handleApiError = (error: any): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with error status
      return error.response.data?.message || `Erro ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      // Request made but no response
      return 'Sem resposta do servidor. Verifique sua conexão.';
    } else {
      // Error setting up request
      return 'Erro ao fazer requisição.';
    }
  }
  return 'Erro desconhecido.';
};
