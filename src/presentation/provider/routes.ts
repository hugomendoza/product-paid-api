import { Router } from 'express';
import { ProviderTransactionService } from '../services/provider-transaction.service';
import { ProviderTransactionController } from './controller';

/**
 * @swagger
 * components:
 *   schemas:
 *     ProviderTransaction:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: El ID auto-generado de la transacción del proveedor.
 *           example: "p1q2r3s4-t5u6-7890-1234-567890abcdef"
 *         transaction_id:
 *           type: string
 *           description: El ID de la transacción.
 *           example: "tr_provider_12345"
 *         status:
 *           type: string
 *           enum: [CREATED, PENDING, SUCCESS, ERROR]
 *           description: El estado de la transacción del proveedor.
 *           example: "CREATED"
 *
 *     CreateProviderTransaction:
 *       type: object
 *       required:
 *         - wompi_transaction_id
 *       properties:
 *         wompi_transaction_id:
 *           type: string
 *           description: El ID de la transacción en Wompi.
 *           example: "tr_wompi_12345"
 */
export class ProviderTransactionRoutes {
  static get routes(): Router {
    const router = Router();
    const providerTransactionService = new ProviderTransactionService();
    const controller = new ProviderTransactionController(providerTransactionService);

    /**
     * @swagger
     * /api/provider:
     *   post:
     *     summary: Crea una nueva transacción de proveedor
     *     tags: [Provider]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateProviderTransaction'
     *     responses:
     *       200:
     *         description: Transacción de proveedor creada exitosamente.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ProviderTransaction'
     *       400:
     *         $ref: '#/components/responses/BadRequest'
     */
    router.post('/', controller.createProviderTransaction);

    /**
     * @swagger
     * /api/provider/{id}:
     *   get:
     *     summary: Actualiza el estado de una transacción de proveedor
     *     tags: [Provider]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: El ID de la transacción
     *     responses:
     *       200:
     *         description: El estado de la transacción del proveedor actualizado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: "SUCCESS"
     *       404:
     *         $ref: '#/components/responses/NotFound'
     */
    router.get('/:id', controller.updateProviderStatusTransaction);

    return router;
  }
}
