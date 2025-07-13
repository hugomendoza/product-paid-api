import { Router } from 'express';
import { DeliveryController } from './controller';
import { DeliveryService } from '../services/delivery.service';

/**
 * @swagger
 * components:
 *   schemas:
 *     Delivery:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: El ID auto-generado de la entrega.
 *           example: "d1e2f3g4-h5i6-7890-1234-567890abcdef"
 *         customer_address:
 *           type: string
 *           description: La dirección de entrega del cliente.
 *           example: "123 Main St"
 *         city:
 *           type: string
 *           description: La ciudad de entrega.
 *           example: "Anytown"
 *         transactionId:
 *           type: string
 *           description: El ID de la transacción asociada.
 *           example: "b1c2d3e4-f5g6-7890-1234-567890abcdef"
 *
 *     CreateDelivery:
 *       type: object
 *       required:
 *         - customer_address
 *         - city
 *         - transactionId
 *       properties:
 *         customer_address:
 *           type: string
 *           description: La dirección de entrega del cliente.
 *           example: "123 Main St"
 *         city:
 *           type: string
 *           description: La ciudad de entrega.
 *           example: "Anytown"
 *         transactionId:
 *           type: string
 *           description: El ID de la transacción asociada.
 *           example: "b1c2d3e4-f5g6-7890-1234-567890abcdef"
 */
export class DeliveryRoutes {
  static get routes(): Router {
    const router = Router();
    const deliveryService = new DeliveryService();
    const controller = new DeliveryController(deliveryService);

    /**
     * @swagger
     * /api/deliveries:
     *   post:
     *     summary: Crea un nuevo registro de entrega
     *     tags: [Deliveries]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateDelivery'
     *     responses:
     *       200:
     *         description: Entrega creada exitosamente.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Delivery'
     *       400:
     *         $ref: '#/components/responses/BadRequest'
     */
    router.post('/', controller.createDelivery);
    return router;
  }
}
