import { CreateDeliveryDto } from '../../../../src/domain/dtos/delivery/create-delivery';

describe('CreateDeliveryDto', () => {
  describe('create', () => {
    it('should create a valid CreateDeliveryDto instance', () => {
      const deliveryData = {
        customer_address: '123 Main St, Apt 4',
        city: 'New York',
        transactionId: 'TRX123456',
      };

      const [error, dto] = CreateDeliveryDto.create(deliveryData);

      expect(error).toBeUndefined();
      expect(dto).toBeDefined();
      expect(dto).toBeInstanceOf(CreateDeliveryDto);
      expect(dto?.customer_address).toBe(deliveryData.customer_address);
      expect(dto?.city).toBe(deliveryData.city);
      expect(dto?.transactionId).toBe(deliveryData.transactionId);
    });

    it('should return error when customer_address is missing', () => {
      const deliveryData = {
        city: 'New York',
        transactionId: 'TRX123456',
      };

      const [error, dto] = CreateDeliveryDto.create(deliveryData);

      expect(error).toBe('Missing customer_address');
      expect(dto).toBeUndefined();
    });

    it('should return error when city is missing', () => {
      const deliveryData = {
        customer_address: '123 Main St, Apt 4',
        transactionId: 'TRX123456',
      };

      const [error, dto] = CreateDeliveryDto.create(deliveryData);

      expect(error).toBe('Missing city');
      expect(dto).toBeUndefined();
    });

    it('should return error when transactionId is missing', () => {
      const deliveryData = {
        customer_address: '123 Main St, Apt 4',
        city: 'New York',
      };

      const [error, dto] = CreateDeliveryDto.create(deliveryData);

      expect(error).toBe('Missing transactionId');
      expect(dto).toBeUndefined();
    });

    it('should handle empty object', () => {
      const [error, dto] = CreateDeliveryDto.create({});

      expect(error).toBe('Missing customer_address');
      expect(dto).toBeUndefined();
    });

    it('should handle null values', () => {
      const deliveryData = {
        customer_address: null,
        city: 'New York',
        transactionId: 'TRX123456',
      };

      const [error, dto] = CreateDeliveryDto.create(deliveryData);

      expect(error).toBe('Missing customer_address');
      expect(dto).toBeUndefined();
    });

    it('should handle undefined values', () => {
      const deliveryData = {
        customer_address: '123 Main St',
        city: undefined,
        transactionId: 'TRX123456',
      };

      const [error, dto] = CreateDeliveryDto.create(deliveryData);

      expect(error).toBe('Missing city');
      expect(dto).toBeUndefined();
    });

    it('should handle empty string values', () => {
      const deliveryData = {
        customer_address: '',
        city: 'New York',
        transactionId: 'TRX123456',
      };

      const [error, dto] = CreateDeliveryDto.create(deliveryData);

      expect(error).toBe('Missing customer_address');
      expect(dto).toBeUndefined();
    });
  });
});
