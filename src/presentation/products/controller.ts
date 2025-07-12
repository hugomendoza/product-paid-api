import { Request, Response } from 'express';

export class ProductController {
  constructor() {}

  createProduct = (req: Request, res: Response) => {
    return res.status(200).json({ id: 1, name: 'Product 1' });
  };

  updateProduct = (req: Request, res: Response) => {
    return res.status(200).json({ id: 1, name: 'Product 1' });
  };
}
