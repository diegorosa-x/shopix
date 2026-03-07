import axios from 'axios';
import { sleep } from '../../utils';

const api = axios.create({
  baseURL: '/api',
});

// Mock interceptor to simulate network delay
api.interceptors.request.use(async (config) => {
  await sleep(500);
  return config;
});

export default api;
