import { Router } from 'express';
import { ProductRoutes } from '../../../src/presentation/products/routes';

describe('ProductRoutes', () => {
  it('should have static routes property', () => {
    expect(ProductRoutes.routes).toBeDefined();
    expect(ProductRoutes.routes).toBeInstanceOf(Function);
  });

  it('should return a Router instance', () => {
    const router = ProductRoutes.routes;
    expect(router).toBeDefined();
    expect(router).toHaveProperty('get');
    expect(router).toHaveProperty('put');
  });
});
