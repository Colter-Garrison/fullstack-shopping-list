const { Router } = require('express');
const Item = require('../models/Item');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const data = await Item.insert({
        ...req.body,
        user_id: req.user.id,
      });
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/', authenticate, async (req, res, next) => {
    try {
      const userList = await Item.getAll(req.user.id);
      res.json(userList);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', [authenticate, authorize], async (req, res, next) => {
    try {
      const newData = await Item.updateById(req.params.id, req.body);
      res.json(newData);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', [authenticate, authorize], async (req, res, next) => {
    try {
      const deleteItem = await Item.delete(req.params.id);
      res.json(deleteItem);
    } catch (e) {
      next(e);
    }
  });
