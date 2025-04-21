// test/booking.test.ts
import request from 'supertest';
import app from '../src/app';

// Mock both decodeTokenAndAttachClaims and isAuthorized middleware
jest.mock('../src/middleware/customClaim.middleware', () => ({
  decodeTokenAndAttachClaims: (req: any, _res: any, next: any) => {
    req.user = { uid: 'test-user-id', role: 'user', email: 'test@example.com' };
    next();
  },
}));

jest.mock('../src/middleware/authorize', () => {
  return () => (_req: any, _res: any, next: any) => next();
});

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

  it('should not create booking with missing fields', async () => {
    const response = await request(app).post('/bookings').send({
      seatNumber: 'A2'
    });
    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  it('should not update a booking with invalid location structure', async () => {
    const createRes = await request(app).post('/bookings').send({
      flightId: 'FL-002',
      seatNumber: 'C1',
      location: { city: 'Delhi', country: 'India' },
    });

    const id = createRes.body.id;

    const updateRes = await request(app)
      .put(`/bookings/${id}`)
      .send({
        seatNumber: 'D4',
        location: "This should be an object"
      });

    expect(updateRes.status).toBeGreaterThanOrEqual(400);
  });

  it('should not allow update with empty seatNumber', async () => {
    const createRes = await request(app).post('/bookings').send({
      flightId: 'FL-003',
      seatNumber: 'E1',
      location: { city: 'Delhi', country: 'India' },
    });

    const id = createRes.body.id;

    const response = await request(app).put(`/bookings/${id}`).send({
      seatNumber: '',
      location: { city: 'Delhi', country: 'India' }
    });

    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  it('should reject booking with non-string seatNumber', async () => {
    const response = await request(app).post('/bookings').send({
      flightId: 'FL-006',
      seatNumber: 12345,
      location: { city: 'Paris', country: 'France' }
    });
    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  it('should reject booking with invalid location type', async () => {
    const response = await request(app).post('/bookings').send({
      flightId: 'FL-007',
      seatNumber: 'G1',
      location: "invalid"
    });
    expect(response.status).toBeGreaterThanOrEqual(400);
  });
});


