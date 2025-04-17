import express from 'express';
import { register, login } from '../controllers/auth.controller';

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 */
router.post('/register', register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user using Firebase ID token
 *     tags: [Auth]
 */
router.post('/login', login);

export default router;