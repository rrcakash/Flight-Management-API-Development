import request from 'supertest';
import app from '../src/app';

describe('Auth Routes', () => {
  const testUser = {
    email: `testuser_${Date.now()}@example.com`,
    password: 'Test@1234',
    role: 'user',
  };

  let idToken = '';

  it('should register a user successfully', async () => {
    const res = await request(app).post('/auth/register').send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toMatchObject({
      email: testUser.email,
      role: testUser.role,
    });
  });

  it('should return error for duplicate registration', async () => {
    const res = await request(app).post('/auth/register').send(testUser);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should fail login with invalid token', async () => {
    const res = await request(app).post('/auth/login').send({
      idToken: 'invalid-token',
    });
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for missing fields during registration', async () => {
    const res = await request(app).post('/auth/register').send({
      email: '',
      password: '',
      role: '',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for missing token on login', async () => {
    const res = await request(app).post('/auth/login').send({});
    expect(res.statusCode).toBe(401); 
  });

  // Check route not found
  it('should return 404 for unknown auth route', async () => {
    const res = await request(app).post('/auth/unknown');
    expect(res.statusCode).toBe(404);
  });
});
