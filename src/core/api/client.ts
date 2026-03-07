import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { sleep } from '../../utils';
import { AppError } from '../types';

const api: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  // Simulate network delay
  await sleep(500);
  
  const token = localStorage.getItem('auth-token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message = (error.response?.data as any)?.message || error.message || 'An unexpected error occurred';
    const status = error.response?.status || 500;
    
    throw new AppError(message, status);
  }
);

export default api;
