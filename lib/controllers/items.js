const { Router } = require('express');
const Item = require('../models/Item');
const authenticate =  require('../middleware/authenticate');

module.exports = Router()
  .post('/', authenticate,  async (req, res, next) => {
    try {
      const data = await Item.insert({
        ...req.body, user_id: req.user.id
      });
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
