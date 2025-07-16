import { Router } from 'express';
import { TokenCardController } from './controller';
import { TokenCardService } from '../services/token-card.service';

/**
 * @swagger
 * components:
 *   schemas:
 *     TokenCard:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: El ID auto-generado del token de la tarjeta.
 *           example: "t1u2v3w4-x5y6-7890-1234-567890abcdef"
 *         token:
 *           type: string
 *           description: El token de la tarjeta.
 *           example: "tok_1234567890"
 *         brand:
 *           type: string
 *           description: La marca de la tarjeta.
 *           example: "Visa"
 *         card_holder:
 *           type: string
 *           description: El titular de la tarjeta.
 *           example: "John Doe"
 *         last_four:
 *           type: string
 *           description: Los últimos cuatro dígitos de la tarjeta.
 *           example: "4242"
 *
 *     CreateTokenCard:
 *       type: object
 *       required:
 *         - token
 *         - brand
 *         - card_holder
 *         - last_four
 *       properties:
 *         token:
 *           type: string
 *         brand:
 *           type: string
 *         card_holder:
 *           type: string
 *         last_four:
 *           type: string
 */
export class TokenCardRoutes {
  static get routes(): Router {
    const router = Router();
    const tokenCardService = new TokenCardService();
    const controller = new TokenCardController(tokenCardService);

    /**
     * @swagger
     * /api/card:
     *   post:
     *     summary: Crea un nuevo token de tarjeta
     *     tags: [Token]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateTokenCard'
     *     responses:
     *       200:
     *         description: Token de tarjeta creado exitosamente.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/TokenCard'
     *       400:
     *         $ref: '#/components/responses/BadRequest'
     */
    router.post('/', controller.createTokenCard);
    return router;
  }
}
