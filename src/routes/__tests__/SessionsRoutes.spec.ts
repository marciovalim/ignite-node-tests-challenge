import request from 'supertest';
import { app } from '../../app';
import { closeDatabase, initializeDatabase } from '../../database';

describe('Sessions Routes', () => {
  beforeAll(async() => {
    await initializeDatabase({ isTest: true, runMigrations: true });
  });

  it('should create return a authorized token', async () => {
     await request(app).post('/api/v1/users').send({
      name: 'Sessions Routes',
      email: 'sessions.routes@gmail.com',
      password: '123456',
    });

    const response = await request(app).post('/api/v1/sessions').send({
      email: 'sessions.routes@gmail.com',
      password: '123456',
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();
  });

  afterAll(async () => {
    await closeDatabase({drop: true});
  });
});
