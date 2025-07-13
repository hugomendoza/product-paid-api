import { Router } from 'express';
import { CustomerController } from './controller';
import { CustomerService } from '../services/customer.service';

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: El ID auto-generado del cliente.
 *           example: "a1b2c3d4-e5f6-7890-1234-567890abcdef"
 *         name:
 *           type: string
 *           description: El nombre del cliente.
 *           example: "John Doe"
 *         phone:
 *           type: string
 *           description: El teléfono del cliente.
 *           example: "+1234567890"
 *         adress:
 *           type: string
 *           description: La dirección del cliente.
 *           example: "123 Main St"
 *         city:
 *           type: string
 *           description: La ciudad del cliente.
 *           example: "Anytown"
 *
 *     CreateCustomer:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *         - adress
 *         - city
 *       properties:
 *         name:
 *           type: string
 *           description: El nombre del cliente.
 *           example: "John Doe"
 *         phone:
 *           type: string
 *           description: El teléfono del cliente.
 *           example: "+1234567890"
 *         adress:
 *           type: string
 *           description: La dirección del cliente.
 *           example: "123 Main St"
 *         city:
 *           type: string
 *           description: La ciudad del cliente.
 *           example: "Anytown"
 *
 *   responses:
 *     BadRequest:
 *       description: La petición es inválida.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: "Missing name"
 */
export class CustomerRoutes {
  static get routes(): Router {
    const router = Router();
    const customerService = new CustomerService();
    const controller = new CustomerController(customerService);

    /**
     * @swagger
     * /api/customers:
     *   post:
     *     summary: Crea un nuevo cliente
     *     tags: [Customers]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateCustomer'
     *     responses:
     *       201:
     *         description: Cliente creado exitosamente.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 customer:
     *                   $ref: '#/components/schemas/Customer'
     *       400:
     *         $ref: '#/components/responses/BadRequest'
     */
    router.post('/', controller.createCustomer);

    return router;
  }
}
