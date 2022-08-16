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
  
});
