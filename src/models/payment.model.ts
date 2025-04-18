export interface Payment {
    id: string;
    userId: string;
    bookingId: string;
    amount: number;
    currency: string;
    status: 'pending' | 'completed' | 'failed';
    timestamp: string;
  }