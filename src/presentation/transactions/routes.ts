import { Router } from 'express';
import { TransactionController } from './controller';

export class TransactionRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new TransactionController();
    router.post('/', controller.createTransaction);
    router.get('/:id', controller.getTransaction);
    return router;
  }
}
