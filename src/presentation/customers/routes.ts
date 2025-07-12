import { Router } from 'express';
import { CustomerController } from './controller';
import { CustomerService } from '../services/customer.service';

export class CustomerRoutes {
  static get routes(): Router {
    const router = Router();
    const customerService = new CustomerService();
    const controller = new CustomerController(customerService);

    router.post('/', controller.createCustomer);

    return router;
  }
}
