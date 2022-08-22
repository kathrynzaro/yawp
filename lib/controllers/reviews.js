const { Router } = require('express');
const Review = require('../models/Review');
const authenticate = require('../middleware/authenticate');
const authDelete = require('../middleware/authDelete');

module.exports = Router()
  .delete('/:id', authenticate, authDelete, async (req, res, next) => {
    try {
      const data = await Review.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  }
  );
