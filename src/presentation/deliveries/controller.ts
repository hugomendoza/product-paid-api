import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors/custom.error';
import { DeliveryService } from '../services/delivery.service';
import { CreateDeliveryDto } from '../../domain/dtos/delivery/create-delivery';

export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal server error 22' });
  };

  createDelivery = (req: Request, res: Response) => {
    const [error, createDto] = CreateDeliveryDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.deliveryService
      .createTransaction(createDto!)
      .then((transaction) => res.json(transaction))
      .catch((error) => this.handleError(error, res));
  };
}
