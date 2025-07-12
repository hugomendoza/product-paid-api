import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { CustomError } from '../../domain/errors/custom.error';

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal server error 22' });
  };

  getProducts = async (req: Request, res: Response) => {
    this.productService
      .getProducts()
      .then((products) => res.json(products))
      .catch((error) => this.handleError(error, res));
  };

  getProductById = (req: Request, res: Response) => {
    const { id } = req.params;

    this.productService
      .getProductById(id)
      .then((product) => res.json(product))
      .catch((error) => this.handleError(error, res));
  };

  updateProduct = (req: Request, res: Response) => {
    const { id } = req.params;
    const { stock } = req.body;

    this.productService
      .updateProduct(id, +stock)
      .then((product) => res.json(product))
      .catch((error) => this.handleError(error, res));
  };
}
