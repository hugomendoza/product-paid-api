import { CreateCustomerDto } from '../../../../src/domain/dtos/customer/create-customer';

describe('CreateCustomerDto', () => {
  describe('create', () => {
    it('should create a valid CreateCustomerDto instance', () => {
      const customerData = {
        name: 'John Doe',
        phone: '1234567890',
        adress: '123 Main St',
        city: 'New York',
      };

      const [error, dto] = CreateCustomerDto.create(customerData);

      expect(error).toBeUndefined();
      expect(dto).toBeDefined();
      expect(dto).toBeInstanceOf(CreateCustomerDto);
      expect(dto?.name).toBe(customerData.name);
      expect(dto?.phone).toBe(customerData.phone);
      expect(dto?.adress).toBe(customerData.adress);
      expect(dto?.city).toBe(customerData.city);
    });

    it('should return error when name is missing', () => {
      const customerData = {
        phone: '1234567890',
        adress: '123 Main St',
        city: 'New York',
      };

      const [error, dto] = CreateCustomerDto.create(customerData);

      expect(error).toBe('Missing name');
      expect(dto).toBeUndefined();
    });

    it('should return error when phone is missing', () => {
      const customerData = {
        name: 'John Doe',
        adress: '123 Main St',
        city: 'New York',
      };

      const [error, dto] = CreateCustomerDto.create(customerData);

      expect(error).toBe('Missing phone');
      expect(dto).toBeUndefined();
    });

    it('should return error when adress is missing', () => {
      const customerData = {
        name: 'John Doe',
        phone: '1234567890',
        city: 'New York',
      };

      const [error, dto] = CreateCustomerDto.create(customerData);

      expect(error).toBe('Missing adress');
      expect(dto).toBeUndefined();
    });

    it('should return error when city is missing', () => {
      const customerData = {
        name: 'John Doe',
        phone: '1234567890',
        adress: '123 Main St',
      };

      const [error, dto] = CreateCustomerDto.create(customerData);

      expect(error).toBe('Missing city');
      expect(dto).toBeUndefined();
    });

    it('should handle empty object', () => {
      const [error, dto] = CreateCustomerDto.create({});

      expect(error).toBe('Missing name');
      expect(dto).toBeUndefined();
    });

    it('should handle null or undefined values', () => {
      const customerData = {
        name: null,
        phone: '1234567890',
        adress: '123 Main St',
        city: 'New York',
      };

      const [error, dto] = CreateCustomerDto.create(customerData);

      expect(error).toBe('Missing name');
      expect(dto).toBeUndefined();
    });
  });
});
