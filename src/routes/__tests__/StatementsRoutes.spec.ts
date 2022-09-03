import request from 'supertest';
import { app } from '../../app';
import { closeDatabase, initializeDatabase } from '../../database';

let headers: object;

describe('Profile Routes', () => {
  beforeAll(async() => {
    await initializeDatabase({ isTest: true, runMigrations: true });

    await request(app).post('/api/v1/users').send({
      name: 'Statements Routes',
      email: 'statements.routes@gmail.com',
      password: '123456',
    });

    const authRes = await request(app).post('/api/v1/sessions').send({
      email: 'statements.routes@gmail.com',
      password: '123456',
    });

    headers = {Authorization: `Bearer ${authRes.body.token}`};
  });



  it('should return statements history', async () => {
    const response = await request(app).get('/api/v1/statements/balance').set(headers);

    expect(response.status).toBe(200);
    expect(response.body.statement).toEqual([]);
    expect(response.body.balance).toBe(0);
  });

  it('should deposit an amount', async () => {
    const response = await request(app).post('/api/v1/statements/deposit').set(headers).send({
      amount: 1,
      description: "description"
    });

    expect(response.status).toBe(201);
  });

  it('should withdraw', async () => {
    const response = await request(app).post('/api/v1/statements/withdraw').set(headers).send({
      amount: 1,
      description: "description"
    });

    expect(response.status).toBe(201);
  });

  it('should return statement details', async () => {
    const depositRes = await request(app).post('/api/v1/statements/deposit').set(headers).send({
      amount: 1,
      description: "description"
    });

    const response = await request(app).get(`/api/v1/statements/${depositRes.body.id}`).set(headers);

    expect(response.status).toBe(200);
    expect(response.body.description).toBeTruthy();
  });

  afterAll(async () => {
    await closeDatabase({drop: true});
  });
});
