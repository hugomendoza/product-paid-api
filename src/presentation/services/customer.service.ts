import { prisma } from '../../data/postgres';
import { CreateCustomerDto } from '../../domain/dtos/customer/create-customer';
import { CustomError } from '../../domain/errors/custom.error';

export class CustomerService {
  constructor() {}

  async createCustomer(createCustomerDto: CreateCustomerDto) {
    try {
      const customer = await prisma.customer.create({
        data: createCustomerDto!,
      });
      return {
        customer,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
