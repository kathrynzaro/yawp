const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: '12345',
};

describe('yawp user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });
  
  it('#POST /api/v1/users should create a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    const { firstName, lastName, email } = mockUser;
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      message: 'You\'ve successfully signed in',
      user: {
        id: expect.any(String),
        firstName,
        lastName,
        email,
      },
    });
  });

  it('#POST /api/v1/users/sessions should log in an existing user', async () => {
    await request(app).post('/api/v1/users').send(mockUser);
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ email: 'test@example.com', password: '12345' });
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual('You\'ve successfully signed in');
  });

  it('/protected should return a 401 if not authenticated', async () => {
    const res = await request(app).get('/api/v1/users/protected');
    expect(res.status).toEqual(401);
  });


  it('GET /api/v1/users should show a list of users to admin', async () => {
    const agent = request.agent(app);

    await agent.post('/api/v1/users').send({
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin',
      password: 'admin'
    });

    await agent
      .post('/api/v1/users/sessions')
      .send({ email: 'admin', password: 'admin' });

    const res = await agent.get('/api/v1/users');

    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
      email: expect.any(String),
    });
  });

});
