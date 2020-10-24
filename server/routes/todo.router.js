const express = require('express');
const toDoRouter = express.Router();
const pool = require('../modules/pool.js');

// DB connection

// GET
toDoRouter.get('/', (req, res) => {
  res.send('Get Hello');
});

// POST
toDoRouter.post('/', (req, res) => {
  res.sendStatus(201);
});

// PUT

// DELETE

module.exports = toDoRouter;
