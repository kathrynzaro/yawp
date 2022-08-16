const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');


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
  
  
});
