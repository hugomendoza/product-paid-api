import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  API_URL: get('API_URL').required().asString(),
  PUBLIC_KEY: get('PUBLIC_KEY').required().asString(),
  INTEGRITY_KEY: get('INTEGRITY_KEY').required().asString(),
};
