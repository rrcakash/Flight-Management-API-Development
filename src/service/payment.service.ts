import { Payment } from '../models/payment.model';
import { v4 as uuidv4 } from 'uuid';

export class PaymentService {
  private payments: Map<string, Payment> = new Map();

  async createPayment(userId: string, bookingId: string, amount: number, currency: string): Promise<Payment> {
    const payment: Payment = {
      id: uuidv4(),
      userId,
      bookingId,
      amount,
      currency,
      status: 'completed',
      timestamp: new Date().toISOString(),
    };
    this.payments.set(payment.id, payment);
    return payment;
  }

  async getPaymentById(id: string): Promise<Payment | null> {
    return this.payments.get(id) || null;
  }
}