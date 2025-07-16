import { Router } from 'express';
import { TokenCardController } from './controller';
import { TokenCardService } from '../services/token-card.service';

export class TokenCardRoutes {
  static get routes(): Router {
    const router = Router();
    const tokenCardService = new TokenCardService();
    const controller = new TokenCardController(tokenCardService);

    router.post('/', controller.createTokenCard);
    return router;
  }
}
