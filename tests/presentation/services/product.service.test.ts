import { ProductService } from '../../../src/presentation/services/product.service';
import { CustomError } from '../../../src/domain/errors/custom.error';
import { prismaMock } from '../../__mocks__/prisma';

describe('ProductService', () => {
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService();
  });

  describe('getProducts', () => {
    it('should return all products successfully', async () => {
      const mockProducts = [
        { 
          id: '1', 
          name: 'Product 1', 
          description: 'Test description 1',
          price: 100, 
          stock: 10,
          image_url: 'https://example.com/image1.jpg',
          createdAt: new Date('2023-01-01')
        },
        { 
          id: '2', 
          name: 'Product 2', 
          description: 'Test description 2',
          price: 200, 
          stock: 20,
          image_url: 'https://example.com/image2.jpg',
          createdAt: new Date('2023-01-02')
        },
      ];

      prismaMock.product.findMany.mockResolvedValue(mockProducts);

      const result = await productService.getProducts();

      expect(result).toEqual({ products: mockProducts });
      expect(prismaMock.product.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.product.findMany).toHaveBeenCalledWith();
    });

    it('should throw internal server error when database fails', async () => {
      prismaMock.product.findMany.mockRejectedValue(new Error('Database error'));

      await expect(productService.getProducts()).rejects.toThrow(CustomError);
      await expect(productService.getProducts()).rejects.toThrow(new CustomError(500, 'Error de conexión con la base de datos'));
    });
  });

  describe('getProductById', () => {
    it('should return a product by id successfully', async () => {
      const mockProduct = { 
        id: '1', 
        name: 'Product 1', 
        description: 'Test description',
        price: 100, 
        stock: 10,
        image_url: 'https://example.com/image.jpg',
        createdAt: new Date('2023-01-01')
      };

      prismaMock.product.findFirst.mockResolvedValue(mockProduct);

      const result = await productService.getProductById('1');

      expect(result).toEqual(mockProduct);
      expect(prismaMock.product.findFirst).toHaveBeenCalledTimes(1);
      expect(prismaMock.product.findFirst).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should throw not found error when product does not exist', async () => {
      prismaMock.product.findFirst.mockResolvedValue(null);

      await expect(productService.getProductById('999')).rejects.toThrow(CustomError);
      await expect(productService.getProductById('999')).rejects.toThrow('Producto no encontrado');
    });
  });

  describe('updateProduct', () => {
    it('should update product stock successfully', async () => {
      const mockProduct = { 
        id: '1', 
        name: 'Product 1', 
        description: 'Test description',
        price: 100, 
        stock: 10,
        image_url: 'https://example.com/image.jpg',
        createdAt: new Date('2023-01-01')
      };
      const updatedProduct = { ...mockProduct, stock: 15 };

      prismaMock.product.findFirst.mockResolvedValue(mockProduct);
      prismaMock.product.update.mockResolvedValue(updatedProduct);

      const result = await productService.updateProduct('1', 15);

      expect(result).toEqual(updatedProduct);
      expect(prismaMock.product.findFirst).toHaveBeenCalledTimes(1);
      expect(prismaMock.product.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.product.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { stock: 15 },
      });
    });

    it('should throw not found error when product does not exist', async () => {
      prismaMock.product.findFirst.mockResolvedValue(null);

      await expect(productService.updateProduct('999', 10)).rejects.toThrow(CustomError);
      await expect(productService.updateProduct('999', 10)).rejects.toThrow('Producto no encontrado');
      expect(prismaMock.product.update).not.toHaveBeenCalled();
    });

    it('should call getProductById to check existence', async () => {
      const mockProduct = { 
        id: '1', 
        name: 'Product 1', 
        description: 'Test description',
        price: 100, 
        stock: 10,
        image_url: 'https://example.com/image.jpg',
        createdAt: new Date('2023-01-01')
      };
      const updatedProduct = { ...mockProduct, stock: 20 };

      // Mock for getProductById call
      prismaMock.product.findFirst.mockResolvedValueOnce(mockProduct);
      // Mock for update
      prismaMock.product.update.mockResolvedValue(updatedProduct);

      const result = await productService.updateProduct('1', 20);

      expect(result).toEqual(updatedProduct);
      expect(prismaMock.product.findFirst).toHaveBeenCalledWith({ where: { id: '1' } });
    });
  });
});
