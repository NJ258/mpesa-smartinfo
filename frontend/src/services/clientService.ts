import axios from 'axios';
import type { ClientProfile } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const saveClient = async (profile: ClientProfile) => {
  await api.post('/clients', profile);
};
