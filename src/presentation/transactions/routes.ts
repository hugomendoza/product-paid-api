import { Router } from 'express';
import { TransactionController } from './controller';
import { TransactionService } from '../services/transaction.service';

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: El ID auto-generado de la transacción.
 *           example: "b1c2d3e4-f5g6-7890-1234-567890abcdef"
 *         wompi_transaction_id:
 *           type: string
 *           description: El ID de la transacción en Wompi.
 *           example: "tr_wompi_12345"
 *         status:
 *           type: string
 *           enum: [PENDING, APPROVED, DECLINED, FAILED]
 *           description: El estado de la transacción.
 *           example: "APPROVED"
 *         product_amount:
 *           type: number
 *           format: float
 *           description: El monto del producto.
 *           example: 19.99
 *         base_fee:
 *           type: number
 *           format: float
 *           description: La tarifa base.
 *           example: 1.50
 *         delivery_fee:
 *           type: number
 *           format: float
 *           description: El costo de envío.
 *           example: 5.00
 *         total_amount:
 *           type: number
 *           format: float
 *           description: El monto total de la transacción.
 *           example: 26.49
 *         payment_method:
 *           type: string
 *           description: El método de pago utilizado.
 *           example: "CARD"
 *         customerId:
 *           type: string
 *           description: El ID del cliente asociado.
 *           example: "a1b2c3d4-e5f6-7890-1234-567890abcdef"
 *         productId:
 *           type: string
 *           description: El ID del producto asociado.
 *           example: "c1f72a7c-6c1c-4bcb-85f1-7a1c4f2c8f34"
 *
 *     CreateTransaction:
 *       type: object
 *       required:
 *         - wompi_transaction_id
 *         - status
 *         - product_amount
 *         - base_fee
 *         - delivery_fee
 *         - total_amount
 *         - payment_method
 *         - customerId
 *         - productId
 *       properties:
 *         wompi_transaction_id:
 *           type: string
 *         status:
 *           type: string
 *           enum: [PENDING, APPROVED, DECLINED, FAILED]
 *         product_amount:
 *           type: number
 *         base_fee:
 *           type: number
 *         delivery_fee:
 *           type: number
 *         total_amount:
 *           type: number
 *         payment_method:
 *           type: string
 *         customerId:
 *           type: string
 *         productId:
 *           type: string
 */
export class TransactionRoutes {
  static get routes(): Router {
    const router = Router();
    const trasactionService = new TransactionService();
    const controller = new TransactionController(trasactionService);

    /**
     * @swagger
     * /api/transactions:
     *   post:
     *     summary: Crea una nueva transacción
     *     tags: [Transactions]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateTransaction'
     *     responses:
     *       200:
     *         description: Transacción creada exitosamente.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Transaction'
     *       400:
     *         $ref: '#/components/responses/BadRequest'
     */
    router.post('/', controller.createTransaction);

    /**
     * @swagger
     * /api/transactions/{id}:
     *   get:
     *     summary: Obtiene una transacción por su ID
     *     tags: [Transactions]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: El ID de la transacción
     *     responses:
     *       200:
     *         description: Una sola transacción.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Transaction'
     *       404:
     *         $ref: '#/components/responses/NotFound'
     */
    router.get('/:id', controller.getTransaction);
    return router;
  }
}
