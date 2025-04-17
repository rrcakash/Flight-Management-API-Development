import request from 'supertest';
import app from '../src/app';

// Inline mock for authenticate middleware
jest.mock('../src/middleware/auth.middleware', () => ({
  authenticate: (req: any, res: any, next: any) => {
    req.user = {
      uid: 'test-user-id',
      role: 'manager',
      email: 'test@example.com',
    };
    next();
  },
}));

describe('Booking API (mocked auth, test mode)', () => {
  let bookingId: string;

  it('should create a new booking', async () => {
    const response = await request(app)
      .post('/bookings')
      .send({
        flightId: 'FL-001',
        seatNumber: 'A1',
        location: {
          city: 'Toronto',
          country: 'Canada',
        },
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    bookingId = response.body.id;
  });

  it('should retrieve the booking by ID', async () => {
    const response = await request(app).get(`/bookings/${bookingId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(bookingId);
  });

  it('should update the booking seat number', async () => {
    const response = await request(app)
      .put(`/bookings/${bookingId}`)
      .send({
        flightId: 'FL-001',
        seatNumber: 'B2',
        location: {
          city: 'Vancouver',
          country: 'Canada',
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.seatNumber).toBe('B2');
  });

  it('should delete the booking', async () => {
    const response = await request(app).delete(`/bookings/${bookingId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/deleted/i);
  });

  it('should return 404 for non-existent booking', async () => {
    const response = await request(app).get('/bookings/nonexistent-id');
    expect(response.status).toBe(404);
    expect(response.body.message).toMatch(/not found/i);
  });
});
