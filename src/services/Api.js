import axios from 'axios';

const BASE_URL = '192.168.132.109'; 

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getComputadores = () => api.get('/computadores');
export const getComputadorById = (id) => api.get(`/computadores/${id}`);
export const createComputador = (data) => api.post('/computadores', data);
export const updateComputador = (id, data) => api.put(`/computadores/${id}`, data);
export const deleteComputador = (id) => api.delete(`/computadores/${id}`);

export const getPerifericos = () => api.get('/perifericos');
export const getPerifericoById = (id) => api.get(`/perifericos/${id}`);
export const createPeriferico = (data) => api.post('/perifericos', data);
export const updatePeriferico = (id, data) => api.put(`/perifericos/${id}`, data);
export const deletePeriferico = (id) => api.delete(`/perifericos/${id}`);

export default api;