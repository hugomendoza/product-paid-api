import api from '../../config/api';
import { CreateTokenCardDto } from '../../domain/dtos/card/token-card';
import { CustomError } from '../../domain/errors/custom.error';
import { CardToken } from '../../interfaces/card-token.interface';

export class TokenCardService {
  constructor() {}

  async createTokenCard(createTokenCardDto: CreateTokenCardDto) {
    try {
      const { data } = await api.post<CardToken>('/tokens/cards', createTokenCardDto);
      return {
        token: data.data.id,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
