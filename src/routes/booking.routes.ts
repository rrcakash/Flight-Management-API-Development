import { Router } from 'express';
import * as BookingController from '../controllers/booking.controller';
import { validateBooking } from '../validators/booking.validator';
import { decodeTokenAndAttachClaims } from '../middleware/customClaim.middleware';
import isAuthorized from '../middleware/authorize';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: API endpoints for managing flight bookings
 */

router.use(decodeTokenAndAttachClaims);

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - flightId
 *               - seatNumber
 *             properties:
 *               flightId:
 *                 type: string
 *               seatNumber:
 *                 type: string
 *               location:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                   country:
 *                     type: string
 *     responses:
 *       201:
 *         description: Booking created successfully
 */
router.post('/', isAuthorized({ hasRole: ['user', 'staff'] }), validateBooking, BookingController.createBooking);

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get a booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking retrieved
 *       404:
 *         description: Booking not found
 */
router.get('/:id', isAuthorized({ hasRole: ['user', 'staff', 'admin'] }), BookingController.getBookingById);


/**
 * @swagger
 * /bookings/{id}:
 *   put:
 *     summary: Update a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seatNumber:
 *                 type: string
 *               status:
 *                 type: string
 *               location:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                   country:
 *                     type: string
 *     responses:
 *       200:
 *         description: Booking updated successfully
 */
router.put('/:id', isAuthorized({ hasRole: ['staff', 'admin'] }), validateBooking, BookingController.updateBooking);

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Delete a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking deleted
 */

router.delete('/:id', isAuthorized({ hasRole: ['admin'] }), BookingController.deleteBooking);

export default router;
