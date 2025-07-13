import { prisma } from '../../data/postgres-db';
import { CreateTransactionDto } from '../../domain/dtos/transaction/create-transaction';
import { CustomError } from '../../domain/errors/custom.error';

export class TransactionService {
  constructor() {}

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    try {
      const transaction = await prisma.transaction.create({
        data: createTransactionDto!,
      });
      return {
        transaction,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getTransaction(id: string) {
    try {
      const transaction = await prisma.transaction.findFirst({
        where: { id },
      });

      if (!transaction) throw CustomError.notFound('Producto no encontrado');
      return {
        transaction,
      };
    } catch (error) {
      throw CustomError.internalServer('Error de conexión con la base de datos');
    }
  }
}
