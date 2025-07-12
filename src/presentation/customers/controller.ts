import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors/custom.error';
import { CustomerService } from '../services/customer.service';
import { CreateCustomerDto } from '../../domain/dtos/customer/create-customer';

export class CustomerController {
  constructor(public readonly customerService: CustomerService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal server error' });
  };

  createCustomer = async (req: Request, res: Response) => {
    const [error, createDto] = CreateCustomerDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.customerService
      .createCustomer(createDto!)
      .then((customer) => {
        res.json(customer);
      })
      .catch((error) => this.handleError(error, res));
  };
}
