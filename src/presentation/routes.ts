import { Router } from 'express';
import { ProductRoutes } from './products/routes';
import { TransactionRoutes } from './transactions/routes';
import { CustomerRoutes } from './customers/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use('/api/products', ProductRoutes.routes);
    router.use('/api/transactions', TransactionRoutes.routes);
    router.use('/api/customers', CustomerRoutes.routes);
    return router;
  }
}
