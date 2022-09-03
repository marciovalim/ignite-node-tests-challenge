import request from 'supertest';
import { app } from '../../app';
import { closeDatabase, initializeDatabase } from '../../database';

describe('Profile Routes', () => {
  beforeAll(async() => {
    await initializeDatabase({ isTest: true, runMigrations: true });
  });

  it('should return user profile', async () => {
     await request(app).post('/api/v1/users').send({
      name: 'Profile Routes',
      email: 'profiles.routes@gmail.com',
      password: '123456',
    });

    const authRes = await request(app).post('/api/v1/sessions').send({
      email: 'profiles.routes@gmail.com',
      password: '123456',
    });

    const response = await request(app).get('/api/v1/profile').set({
      Authorization: `Bearer ${authRes.body.token}`,
    });

    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    await closeDatabase({drop: true});
  });
});
