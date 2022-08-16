const { Router } = require('express');
const Review = require('../models/Review');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

module.exports = Router().delete('/:id', authenticate, authorize, async (req, res, next) => {
  try {
    const data = await Review.delete(req.params.id);
    res.json(data);
  } catch (e) {
    next(e);
  }
}
);
