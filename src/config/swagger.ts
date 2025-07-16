import swaggerJSDoc from 'swagger-jsdoc';
import { envs } from './env';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Product Paid API',
    version: '1.0.0',
    description: 'Documentación de la API del servicio Product Paid.',
  },
  servers: [
    {
      url: `http://localhost:${envs.PORT}`,
      description: 'Servidor de desarrollo',
    },
  ],
  tags: [
    {
      name: 'Products',
      description: 'Endpoints para administrar productos',
    },
    {
      name: 'Transactions',
      description: 'Endpoints para administrar transacciones',
    },
    {
      name: 'Customers',
      description: 'Endpoints para administrar clientes',
    },
    {
      name: 'Deliveries',
      description: 'Endpoints para administrar entregas',
    },
    {
      name: 'Provider',
      description: 'Endpoints para administrar transacciones del proveedor',
    },
    {
      name: 'Token',
      description: 'Endpoints para administrar tokens de tarjeta',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/presentation/**/routes.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
