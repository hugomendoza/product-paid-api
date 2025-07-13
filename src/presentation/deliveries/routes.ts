import { Router } from 'express';
import { DeliveryController } from './controller';
import { DeliveryService } from '../services/delivery.service';

export class DeliveryRoutes {
  static get routes(): Router {
    const router = Router();
    const deliveryService = new DeliveryService();
    const controller = new DeliveryController(deliveryService);

    router.post('/', controller.createDelivery);
    return router;
  }
}
