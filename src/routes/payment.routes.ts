import { Router } from 'express';
import { createPayment, getPaymentById } from '../controllers/payment.controller';

const router = Router();

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Process a new payment
 *     tags: [Payments]
 */
router.post('/payments', createPayment);

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Get payment details by ID
 *     tags: [Payments]
 */
router.get('/payments/:id', getPaymentById);

export default router; 