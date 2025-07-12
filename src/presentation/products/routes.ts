import { Router } from 'express';
import { ProductController } from './controller';
import { ProductService } from '../services/product.service';

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();
    const productService = new ProductService();
    const controller = new ProductController(productService);

    router.get('/', controller.getProducts);
    router.get('/:id', controller.getProductById);
    router.patch('/:id', controller.updateProduct);
    return router;
  }
}
