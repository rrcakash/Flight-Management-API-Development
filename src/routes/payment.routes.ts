import { Router } from 'express';
import { createPayment, getPaymentById } from '../controllers/payment.controller';
import { decodeTokenAndAttachClaims } from '../middleware/customClaim.middleware';
import isAuthorized from '../middleware/authorize';

const router = Router();

/**
 * Apply role-based protection
 */
router.use(decodeTokenAndAttachClaims);

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Process a new payment
 *     tags: [Payments]
 */
router.post(
  '/payments',
  isAuthorized({ hasRole: ['user', 'staff'] }),
  createPayment
);

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Get payment details by ID
 *     tags: [Payments]
 */
router.get(
  '/payments/:id',
  isAuthorized({ hasRole: ['user', 'staff'] }), // ✅ Restrict view access too
  getPaymentById
);

export default router;
