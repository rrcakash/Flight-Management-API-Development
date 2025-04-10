import { Request, Response } from 'express';
import * as BookingService from '../services/booking.service';

export const createBooking = async (req: Request, res: Response) => {
  const result = await BookingService.createBooking(req.body, req.user.uid);
  res.status(201).json(result);
};

export const getBookingById = async (req: Request, res: Response) => {
  const result = await BookingService.getBooking(req.params.id);
  res.status(200).json(result);
};

export const updateBooking = async (req: Request, res: Response) => {
  const result = await BookingService.updateBooking(req.params.id, req.body);
  res.status(200).json(result);
};

export const deleteBooking = async (req: Request, res: Response) => {
  const result = await BookingService.deleteBooking(req.params.id);
  res.status(200).json(result);
};
