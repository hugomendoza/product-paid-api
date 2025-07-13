import { Request, Response } from 'express';
import { TransactionService } from '../services/transaction.service';
import { CustomError } from '../../domain/errors/custom.error';
import { CreateTransactionDto } from '../../domain/dtos/transaction/create-transaction';

export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal server error 22' });
  };

  createTransaction = (req: Request, res: Response) => {
    const [error, createDto] = CreateTransactionDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.transactionService
      .createTransaction(createDto!)
      .then((transaction) => res.json(transaction))
      .catch((error) => this.handleError(error, res));
  };

  getTransaction = (req: Request, res: Response) => {
    const { id } = req.params;

    this.transactionService
      .getTransaction(id)
      .then((transaction) => res.json(transaction))
      .catch((error) => this.handleError(error, res));
  };
}
