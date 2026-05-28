import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const loginAgent = async (name: string, agentCode: string) => {
  const response = await api.post('/agents/login', { name, code: agentCode });
  return response.data; // returns { message, agent: { id, name, code, role } }
};

export const loginAdmin = async (email: string, password: string) => {
  const response = await api.post('/agents/admin-login', { email, password });
  return response.data; // returns { message, admin: { id, name, email, role } }
};
