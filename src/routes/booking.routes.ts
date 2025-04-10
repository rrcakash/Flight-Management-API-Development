import { Router } from 'express';
import * as BookingController from '../controllers/booking.controller'; // Your controller logic is inside booking.module
import { authenticate } from '../middleware/auth.middleware';
import { validateBooking } from '../validators/booking.validator';

const router = Router();

// Apply authentication middleware to all booking routes
router.use(authenticate);

// Routes
router.post('/', validateBooking, BookingController.createBooking);
router.get('/:id', BookingController.getBookingById);
router.put('/:id', validateBooking, BookingController.updateBooking);
router.delete('/:id', BookingController.deleteBooking);

export default router;