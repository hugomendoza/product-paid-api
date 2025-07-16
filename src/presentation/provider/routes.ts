import { Router } from 'express';
import { ProviderTransactionService } from '../services/provider-transaction.service';
import { ProviderTransactionController } from './controller';

export class ProviderTransactionRoutes {
  static get routes(): Router {
    const router = Router();
    const providerTransactionService = new ProviderTransactionService();
    const controller = new ProviderTransactionController(providerTransactionService);

    router.post('/', controller.createProviderTransaction);
    router.get('/:id', controller.updateProviderStatusTransaction);

    return router;
  }
}
