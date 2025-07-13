import { Request, Response } from 'express';
import { ProductController } from '../../../src/presentation/products/controller';
import { ProductService } from '../../../src/presentation/services/product.service';
import { CustomError } from '../../../src/domain/errors/custom.error';

// Mock ProductService
jest.mock('../../../src/presentation/services/product.service');

describe('ProductController', () => {
  let productController: ProductController;
  let mockProductService: jest.Mocked<ProductService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    // Create mock service
    mockProductService = new ProductService() as jest.Mocked<ProductService>;
    productController = new ProductController(mockProductService);

    // Reset mocks
    mockRequest = {};
    mockResponse = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('should return all products successfully', async () => {
      const mockProducts = {
        products: [
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
        ],
      };

      mockProductService.getProducts.mockResolvedValue(mockProducts);

      await productController.getProducts(mockRequest as Request, mockResponse as Response);

      expect(mockProductService.getProducts).toHaveBeenCalledTimes(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockProducts);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should handle CustomError correctly', async () => {
      const customError = CustomError.notFound('Products not found');
      mockProductService.getProducts.mockRejectedValue(customError);

      await productController.getProducts(mockRequest as Request, mockResponse as Response);
      
      // Wait for the promise to resolve
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Products not found' });
    });

    it('should handle generic error with 500 status', async () => {
      const genericError = new Error('Unexpected error');
      mockProductService.getProducts.mockRejectedValue(genericError);

      await productController.getProducts(mockRequest as Request, mockResponse as Response);
      
      // Wait for the promise to resolve
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal server error 22' });
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
      mockRequest.params = { id: '1' };

      mockProductService.getProductById.mockResolvedValue(mockProduct);

      await productController.getProductById(mockRequest as Request, mockResponse as Response);

      expect(mockProductService.getProductById).toHaveBeenCalledWith('1');
      expect(mockProductService.getProductById).toHaveBeenCalledTimes(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockProduct);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should handle not found error', async () => {
      mockRequest.params = { id: '999' };
      const notFoundError = CustomError.notFound('Producto no encontrado');

      mockProductService.getProductById.mockRejectedValue(notFoundError);

      await productController.getProductById(mockRequest as Request, mockResponse as Response);
      
      // Wait for the promise to resolve
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Producto no encontrado' });
    });
  });

  describe('updateProduct', () => {
    it('should update product stock successfully', async () => {
      const updatedProduct = { 
        id: '1', 
        name: 'Product 1', 
        description: 'Test description',
        price: 100, 
        stock: 15,
        image_url: 'https://example.com/image.jpg',
        createdAt: new Date('2023-01-01')
      };
      mockRequest.params = { id: '1' };
      mockRequest.body = { stock: '15' };

      mockProductService.updateProduct.mockResolvedValue(updatedProduct);

      await productController.updateProduct(mockRequest as Request, mockResponse as Response);

      expect(mockProductService.updateProduct).toHaveBeenCalledWith('1', 15);
      expect(mockProductService.updateProduct).toHaveBeenCalledTimes(1);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedProduct);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should convert stock string to number', async () => {
      const updatedProduct = { 
        id: '1', 
        name: 'Product 1', 
        description: 'Test description',
        price: 100, 
        stock: 20,
        image_url: 'https://example.com/image.jpg',
        createdAt: new Date('2023-01-01')
      };
      mockRequest.params = { id: '1' };
      mockRequest.body = { stock: '20' };

      mockProductService.updateProduct.mockResolvedValue(updatedProduct);

      await productController.updateProduct(mockRequest as Request, mockResponse as Response);

      expect(mockProductService.updateProduct).toHaveBeenCalledWith('1', 20);
    });

    it('should handle update errors', async () => {
      mockRequest.params = { id: '999' };
      mockRequest.body = { stock: 10 };
      const notFoundError = CustomError.notFound('Producto no encontrado');

      mockProductService.updateProduct.mockRejectedValue(notFoundError);

      await productController.updateProduct(mockRequest as Request, mockResponse as Response);
      
      // Wait for the promise to resolve
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Producto no encontrado' });
    });
  });

  describe('handleError', () => {
    it('should handle CustomError with correct status code', async () => {
      const badRequestError = CustomError.badRequest('Bad request');
      mockProductService.getProducts.mockRejectedValue(badRequestError);

      await productController.getProducts(mockRequest as Request, mockResponse as Response);
      
      // Wait for the promise to resolve
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Bad request' });
    });

    it('should handle unknown errors as 500', async () => {
      const unknownError = { message: 'Unknown error' };
      mockProductService.getProducts.mockRejectedValue(unknownError);

      await productController.getProducts(mockRequest as Request, mockResponse as Response);
      
      // Wait for the promise to resolve
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal server error 22' });
    });
  });
});
