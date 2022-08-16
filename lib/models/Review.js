const pool = require('../utils/pool');

module.exports = class Review {
  id;
  restaurant_id;
  user_id;
  stars;
  content;

  constructor(row) {
    this.id = row.id;
    this.restaurant_id = row.restaurant_id;
    this.user_id = row.user_id;
    this.stars = row.stars;
    this.content = row.content;
  }

  static async insert({ user_id, restaurant_id, stars, content }) {
    const { rows } = await pool.query(
      `
    INSERT INTO yawp_reviews (user_id, restaurant_id, stars, content)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
      [user_id, restaurant_id, stars, content]
    );
    return new Review(rows[0]);
  }
  
  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM yawp_reviews
      WHERE id = $1`,
      [id]
    ); 
    return new Review(rows[0]);
  }
    
    
  static async delete(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM yawp_reviews
        WHERE id = $1
        RETURNING *
        `,
      [id]
    );
    return new Review(rows[0]);
  }
};
