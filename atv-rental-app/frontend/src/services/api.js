import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
});

export async function getClients() {
  const { data } = await api.get('/api/clients');
  return data;
}

export async function getAtvs() {
  const { data } = await api.get('/api/atvs');
  return data;
}

export async function getRentals() {
  const { data } = await api.get('/api/rentals');
  return data;
}

export async function createClient(payload) {
  const { data } = await api.post('/api/clients', payload);
  return data;
}

export async function createAtv(payload) {
  const { data } = await api.post('/api/atvs', payload);
  return data;
}

export async function createRental(payload) {
  const { data } = await api.post('/api/rentals', payload);
  return data;
}

export default api;
