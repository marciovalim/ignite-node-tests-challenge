import request from 'supertest';
import { app } from '../../app';
import { closeDatabase, initializeDatabase } from '../../database';

describe('Create User Route', () => {
  beforeAll(async() => {
    await initializeDatabase({ isTest: true, runMigrations: true });
  });

  it('should create a new user', async () => {
    const response = await request(app).post('/api/v1/users').send({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });


    expect(response.status).toBe(201);
  });

  afterAll(async () => {
    await closeDatabase({drop: true});
  });
});
