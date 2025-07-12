import { prisma } from '../../data/postgres';
import { CustomError } from '../../domain/errors/custom.error';

export class ProductService {
  constructor() {}

  async getProducts() {
    try {
      const products = await prisma.product.findMany();
      return {
        products,
      };
    } catch (error) {
      throw CustomError.internalServer('Error de conexión con la base de datos');
    }
  }

  async getProductById(id: string) {
    const product = await prisma.product.findFirst({
      where: { id },
    });

    if (!product) throw CustomError.notFound('Producto no encontrado');

    return product;
  }

  async updateProduct(id: string, stock: number) {
    const product = await this.getProductById(id);

    if (!product) throw CustomError.notFound('Producto no encontrado');
    const updateStock = await prisma.product.update({
      where: { id },
      data: { stock: stock },
    });

    return updateStock;
  }
}
