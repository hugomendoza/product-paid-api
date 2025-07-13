import { Router } from 'express';
import { TransactionController } from './controller';
import { TransactionService } from '../services/transaction.service';

export class TransactionRoutes {
  static get routes(): Router {
    const router = Router();
    const trasactionService = new TransactionService();
    const controller = new TransactionController(trasactionService);

    router.post('/', controller.createTransaction);
    router.get('/:id', controller.getTransaction);
    return router;
  }
}
