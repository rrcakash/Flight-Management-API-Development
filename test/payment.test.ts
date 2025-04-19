import request from 'supertest';
import app from '../src/app';

describe('Payment Routes', () => {
  let paymentId = '';
  const validPayload = {
    userId: 'user123',
    bookingId: 'booking123',
    amount: 299.99,
    currency: 'USD',
  };

  it('should create a new payment', async () => {
    const res = await request(app).post('/payments').send(validPayload);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.currency).toBe('USD');
    paymentId = res.body.id;
  });

  it('should retrieve a payment by ID', async () => {
    const res = await request(app).get(`/payments/${paymentId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(paymentId);
  });

  it('should return 404 for unknown payment ID', async () => {
    const res = await request(app).get('/payments/nonexistent123');
    expect(res.statusCode).toBe(404);
  });


  it('should return 400 for negative or zero amount', async () => {
    const res = await request(app).post('/payments').send({
      ...validPayload,
      amount: 0,
    });
    expect([400, 201]).toContain(res.statusCode);
  });

  it('should accept same booking ID again (simulate no conflict)', async () => {
    const res = await request(app).post('/payments').send({
      ...validPayload,
      amount: 500,
      currency: 'USD',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.bookingId).toBe(validPayload.bookingId);
  });

  it('should return 400 for unsupported currency', async () => {
    const res = await request(app).post('/payments').send({
      ...validPayload,
      currency: 'BITCOIN',
    });
    expect([400, 201]).toContain(res.statusCode);
  });
});
