import { Router } from 'express';
import { ProductRoutes } from './products/routes';
import { TransactionRoutes } from './transactions/routes';
import { CustomerRoutes } from './customers/routes';
import { DeliveryRoutes } from './deliveries/routes';
import { TokenCardRoutes } from './token/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use('/api/products', ProductRoutes.routes);
    router.use('/api/transactions', TransactionRoutes.routes);
    router.use('/api/customers', CustomerRoutes.routes);
    router.use('/api/deliveries', DeliveryRoutes.routes);
    router.use('/api/card', TokenCardRoutes.routes);
    return router;
  }
}
