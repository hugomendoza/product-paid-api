import api from '../../config/api';
import { envs } from '../../config/env';
import { generateSecret } from '../../config/generateSecret';
import { CreateExternalTransactionDto } from '../../domain/dtos/transaction/create-external-transaction';
import { CustomError } from '../../domain/errors/custom.error';
import { Merchant } from '../../interfaces/merchant.interface';
import { prisma } from '../../data/postgres-db';
import { ProviderTransaction } from '../../interfaces/provider-transaction';
import { StatusTransaction } from '../../interfaces/status-transaction';
import { TransactionStatus } from '@prisma/client';

export class ProviderTransactionService {
  constructor() {}

  async createProviderTransaction(createExternalTransactionDto: CreateExternalTransactionDto) {
    try {
      const merchant = await api.get<Merchant>(`/merchants/${envs.PUBLIC_KEY}`);
      const acceptance_token = merchant.data.data.presigned_personal_data_auth.acceptance_token;

      const chainText = `${createExternalTransactionDto.reference}${createExternalTransactionDto.amount_in_cents}${createExternalTransactionDto.currency}${envs.INTEGRITY_KEY}`;
      const secret = await generateSecret(chainText);

      const { data } = await api.post<ProviderTransaction>('/transactions', {
        ...createExternalTransactionDto,
        signature: secret,
        acceptance_token,
      });

      const id = data.data.reference;

      await prisma.transaction.update({
        where: { id },
        data: { wompi_transaction_id: data.data.id },
      });

      return {
        data: data.data,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async updateProviderStatusTransaction(id: string) {
    try {
      const { data } = await api.get<StatusTransaction>(`/transactions/${id}`);

      const idProvider = data.data.id;

      await prisma.transaction.update({
        where: { wompi_transaction_id: idProvider },
        data: { status: data.data.status as TransactionStatus },
      });

      return {
        data: data.data,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
