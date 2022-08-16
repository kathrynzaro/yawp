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

describe('restaurant', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('GET /api/v1/restaurants should show a list of restaurants', async () => {
    const res = await request(app).get('/api/v1/restaurants');

    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      type: expect.any(String),
      location: expect.any(String),
    });
  });
  
  it('GET /api/v1/restaurants/:restId	should show restaurant detail with nested reviews', async () => {
    const res = await request(app).get('/api/v1/restaurants/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      name: 'Creepy\'s',
      type: 'Bar',
      location: 'Portland',
      reviews: expect.any(Array),
    });
  });

  it('#POST /restaurants/:restId/reviews creates new review for authenticated users', async () => {
    const mockReview = {
      stars: 4,
      content: 'ugh',
    };

    const agent = request.agent(app);
    await agent.post('/api/v1/users').send(mockUser);

    const res = await agent
      .post('/api/v1/restaurants/1/reviews')
      .send(mockReview);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '5',
      user_id: expect.any(String),
      restaurant_id: '1',
      ...mockReview,
    });
  });

  it('DELETE /api/v1/reviews/:id should delete a review for admin', async () => {
    const agent = request.agent(app);
    await agent.post('/api/v1/users').send({
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin',
      password: 'admin'
    });

    const res = await agent.delete('/api/v1/reviews/1');
    expect(res.status).toBe(200);

    const resp = await agent.get('/api/v1/reviews/1');
    expect(resp.status).toBe(404);
  });
  
});
