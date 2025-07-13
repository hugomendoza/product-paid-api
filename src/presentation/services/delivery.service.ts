import { prisma } from '../../data/postgres-db';
import { CreateDeliveryDto } from '../../domain/dtos/delivery/create-delivery';
import { CustomError } from '../../domain/errors/custom.error';

export class DeliveryService {
  constructor() {}

  async createTransaction(createDeliveryDto: CreateDeliveryDto) {
    try {
      const delivery = await prisma.delivery.create({
        data: createDeliveryDto!,
      });
      return {
        delivery,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
