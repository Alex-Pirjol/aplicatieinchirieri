import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getClients = async () => {
  const response = await apiClient.get('/clients');
  return response.data;
};

export const getClient = async (id) => {
  const response = await apiClient.get(`/clients/${id}`);
  return response.data;
};

export const createClient = async (data) => {
  const response = await apiClient.post('/clients', data);
  return response.data;
};

export const updateClient = async (id, data) => {
  const response = await apiClient.put(`/clients/${id}`, data);
  return response.data;
};

export const deleteClient = async (id) => {
  await apiClient.delete(`/clients/${id}`);
};
