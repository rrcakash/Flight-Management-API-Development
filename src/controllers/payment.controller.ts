import { Request, Response } from 'express';
import { PaymentService } from '../service/payment.service'; 

const paymentService = new PaymentService(); 
export const createPayment = async (req: Request, res: Response): Promise<void> => {
    const { userId, bookingId, amount, currency } = req.body;
    try {
      const payment = await paymentService.createPayment(userId, bookingId, amount, currency);
      res.status(201).json(payment); 
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(400).json({ error: message });
    }
  };
  
  export const getPaymentById = async (req: Request, res: Response): Promise<void> => {
    try {
      const payment = await paymentService.getPaymentById(req.params.id);
      if (!payment) {
        res.status(404).json({ error: 'Payment not found' });
        return;
      }
      res.status(200).json(payment);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: message });
    }
  };