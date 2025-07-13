import { Router } from 'express';
import { ProductController } from './controller';
import { ProductService } from '../services/product.service';

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - stock
 *       properties:
 *         id:
 *           type: string
 *           description: El ID auto-generado del producto.
 *           example: c1f72a7c-6c1c-4bcb-85f1-7a1c4f2c8f34
 *         name:
 *           type: string
 *           description: El nombre del producto.
 *           example: El Señor de los Anillos
 *         price:
 *           type: number
 *           format: float
 *           description: El precio del producto.
 *           example: 19.99
 *         stock:
 *           type: integer
 *           description: El stock disponible del producto.
 *           example: 10
 *         image_url:
 *           type: string
 *           description: La URL de la imagen del producto.
 *         description:
 *           type: string
 *           description: Una descripción del producto.
 *   responses:
 *      NotFound:
 *          description: El recurso especificado no fue encontrado.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          error:
 *                              type: string
 *                              example: Producto no encontrado
 */
export class ProductRoutes {
  static get routes(): Router {
    const router = Router();
    const productService = new ProductService();
    const controller = new ProductController(productService);

    /**
     * @swagger
     * /api/products:
     *   get:
     *     summary: Obtiene una lista de productos
     *     tags: [Products]
     *     responses:
     *       200:
     *         description: Una lista de productos.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 products:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/Product'
     */
    router.get('/', controller.getProducts);

    /**
     * @swagger
     * /api/products/{id}:
     *   get:
     *     summary: Obtiene un producto por su ID
     *     tags: [Products]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: El ID del producto
     *     responses:
     *       200:
     *         description: Un solo producto.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Product'
     *       404:
     *         $ref: '#/components/responses/NotFound'
     */
    router.get('/:id', controller.getProductById);

    /**
     * @swagger
     * /api/products/{id}:
     *   patch:
     *     summary: Actualiza el stock de un producto
     *     tags: [Products]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: El ID del producto
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               stock:
     *                 type: integer
     *                 description: La nueva cantidad de stock.
     *                 example: 5
     *     responses:
     *       200:
     *         description: El producto actualizado.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Product'
     *       404:
     *         $ref: '#/components/responses/NotFound'
     */
    router.patch('/:id', controller.updateProduct);
    return router;
  }
}
