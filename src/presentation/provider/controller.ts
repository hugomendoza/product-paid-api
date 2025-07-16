import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors/custom.error';
import { ProviderTransactionService } from '../services/provider-transaction.service';
import { CreateExternalTransactionDto } from '../../domain/dtos/transaction/create-external-transaction';

export class ProviderTransactionController {
  constructor(private readonly providerTransactionService: ProviderTransactionService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal server error 22' });
  };

  createProviderTransaction = (req: Request, res: Response) => {
    const [error, createDto] = CreateExternalTransactionDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.providerTransactionService
      .createProviderTransaction(createDto!)
      .then((transaction) => res.json(transaction))
      .catch((error) => this.handleError(error, res));
  };

  updateProviderStatusTransaction = (req: Request, res: Response) => {
    const { id } = req.params;

    this.providerTransactionService
      .updateProviderStatusTransaction(id)
      .then((transaction) => res.json(transaction))
      .catch((error) => this.handleError(error, res));
  };
}
