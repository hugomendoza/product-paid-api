import { CreateTransactionDto } from '../../../../src/domain/dtos/transaction/create-transaction';

describe('CreateTransactionDto', () => {
  describe('create', () => {
    const validTransactionData = {
      wompi_transaction_id: 'WOMPI123456',
      status: 'APPROVED',
      product_amount: 100,
      base_fee: 10,
      delivery_fee: 5,
      total_amount: 115,
      payment_method: 'CARD',
      customerId: 'CUST123',
      productId: 'PROD456',
    };

    it('should create a valid CreateTransactionDto instance', () => {
      const [error, dto] = CreateTransactionDto.create(validTransactionData);

      expect(error).toBeUndefined();
      expect(dto).toBeDefined();
      expect(dto).toBeInstanceOf(CreateTransactionDto);
      expect(dto?.wompi_transaction_id).toBe(validTransactionData.wompi_transaction_id);
      expect(dto?.status).toBe(validTransactionData.status);
      expect(dto?.product_amount).toBe(validTransactionData.product_amount);
      expect(dto?.base_fee).toBe(validTransactionData.base_fee);
      expect(dto?.delivery_fee).toBe(validTransactionData.delivery_fee);
      expect(dto?.total_amount).toBe(validTransactionData.total_amount);
      expect(dto?.payment_method).toBe(validTransactionData.payment_method);
      expect(dto?.customerId).toBe(validTransactionData.customerId);
      expect(dto?.productId).toBe(validTransactionData.productId);
    });

    it('should accept different valid status values', () => {
      const statuses: Array<'PENDING' | 'APPROVED' | 'DECLINED' | 'FAILED'> = [
        'PENDING',
        'APPROVED',
        'DECLINED',
        'FAILED',
      ];

      statuses.forEach((status) => {
        const data = { ...validTransactionData, status };
        const [error, dto] = CreateTransactionDto.create(data);

        expect(error).toBeUndefined();
        expect(dto?.status).toBe(status);
      });
    });

    describe('validation errors', () => {
      const testCases = [
        { field: 'wompi_transaction_id', message: 'Missing wompi_transaction_id' },
        { field: 'status', message: 'Missing status' },
        { field: 'product_amount', message: 'Missing product_amount' },
        { field: 'base_fee', message: 'Missing base_fee' },
        { field: 'delivery_fee', message: 'Missing delivery_fee' },
        { field: 'total_amount', message: 'Missing total_amount' },
        { field: 'payment_method', message: 'Missing payment_method' },
        { field: 'customerId', message: 'Missing customerId' },
        { field: 'productId', message: 'Missing productId' },
      ];

      testCases.forEach(({ field, message }) => {
        it(`should return error when ${field} is missing`, () => {
          const data = { ...validTransactionData };
          delete (data as any)[field];

          const [error, dto] = CreateTransactionDto.create(data);

          expect(error).toBe(message);
          expect(dto).toBeUndefined();
        });
      });
    });

    it('should handle empty object', () => {
      const [error, dto] = CreateTransactionDto.create({});

      expect(error).toBe('Missing wompi_transaction_id');
      expect(dto).toBeUndefined();
    });

    it('should handle null values', () => {
      const data = { ...validTransactionData, wompi_transaction_id: null };

      const [error, dto] = CreateTransactionDto.create(data);

      expect(error).toBe('Missing wompi_transaction_id');
      expect(dto).toBeUndefined();
    });

    it('should handle zero values for numeric fields', () => {
      const data = {
        ...validTransactionData,
        product_amount: 0,
        base_fee: 0,
        delivery_fee: 0,
        total_amount: 0,
      };

      const [error, dto] = CreateTransactionDto.create(data);

      expect(error).toBe('Missing product_amount');
      expect(dto).toBeUndefined();
    });
  });
});
