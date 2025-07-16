import { Request, Response } from 'express';
import { CustomError } from '../../domain/errors/custom.error';
import { TokenCardService } from '../services/token-card.service';
import { CreateTokenCardDto } from '../../domain/dtos/card/token-card';

export class TokenCardController {
  constructor(private readonly tokenCardService: TokenCardService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal server error 22' });
  };

  createTokenCard = (req: Request, res: Response) => {
    const [error, createDto] = CreateTokenCardDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.tokenCardService
      .createTokenCard(createDto!)
      .then((token) => res.json(token))
      .catch((error) => this.handleError(error, res));
  };
}
