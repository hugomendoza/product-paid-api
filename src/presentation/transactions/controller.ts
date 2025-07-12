import { Request, Response } from 'express';

export class TransactionController {
  constructor() {}

  createTransaction = (req: Request, res: Response) => {
    return res.status(200).json({ id: 1, name: 'transaction 1' });
  };

  getTransaction = (req: Request, res: Response) => {
    return res.status(200).json({ id: 1, name: 'transaction 1' });
  };
}
