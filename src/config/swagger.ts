import swaggerJSDoc from 'swagger-jsdoc';
import { envs } from './env';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Product Paid API',
    version: '1.0.0',
    description: 'API documentation for the Product Paid service.',
  },
  servers: [
    {
      url: `http://localhost:${envs.PORT}`,
      description: 'Development server',
    },
  ],
  tags: [
    {
      name: 'Products',
      description: 'Endpoints for managing products',
    },
    {
      name: 'Transactions',
      description: 'Endpoints for managing transactions',
    },
    {
      name: 'Customers',
      description: 'Endpoints for managing customers',
    },
    {
      name: 'Deliveries',
      description: 'Endpoints for managing deliveries',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/presentation/**/routes.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
