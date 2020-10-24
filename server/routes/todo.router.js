const express = require('express');
const toDoRouter = express.Router();
const pool = require('../modules/pool.js');

// DB connection

// GET
toDoRouter.get('/', (req, res) => {
  const queryText = `SELECT * FROM "todo" ORDER BY "id" ASC;`;

  pool
    .query(queryText)
    .then((toDoResponse) => {
      res.send(toDoResponse.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// POST
toDoRouter.post('/', (req, res) => {
  res.sendStatus(201);
});

// PUT

// DELETE

module.exports = toDoRouter;
