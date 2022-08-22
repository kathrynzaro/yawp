const pool = require('../utils/pool');

module.exports = class Restaurant {
  id;
  name;
  type;
  location;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.location = row.location;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM yawp_restaurants');
    return rows.map((row) => new Restaurant(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM yawp_restaurants
      WHERE id = $1`,
      [id]
    );
    return new Restaurant(rows[0]);
  }

  async getReviews() {
    const { rows } = await pool.query(
      `SELECT yawp_reviews.* FROM yawp_restaurants
      LEFT JOIN yawp_reviews on yawp_reviews.restaurant_id = yawp_restaurants.id
      WHERE yawp_restaurants.id = $1`,
      [this.id]
    );
    return rows;
  }

};
