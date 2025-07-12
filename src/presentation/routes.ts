import { Router } from 'express';
import { ProductRoutes } from './products/routes';
import { TransactionRoutes } from './transactions/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use('/api/products', ProductRoutes.routes);
    router.use('/api/transactions', TransactionRoutes.routes);
    return router;
  }
}
