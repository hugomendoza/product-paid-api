import axios from 'axios';
import { envs } from './env';

const api = axios.create({
  baseURL: envs.API_URL,
  headers: {
    Authorization: `Bearer ${envs.PUBLIC_KEY}`,
  },
});

export default api;
