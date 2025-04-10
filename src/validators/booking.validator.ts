import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const schema = Joi.object({
  flightId: Joi.string().required(),
  seatNumber: Joi.string().required(),
  location: Joi.object({
    city: Joi.string(),
    country: Joi.string(),
  }).optional(),
});

export const validateBooking = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  next();
};