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
  // {
  //   name: 'testName',
  //   task: 'testName',
  //   task_completion: 'testName',
  //   task_description: 'testName',
  // }
  const newTask = req.body;
  const queryText = `INSERT INTO "todo" ("name", "task", "task_completion", "task_description")
  VALUES ($1, $2, $3, $4);`;
  const queryDataList = [
    newTask.name,
    newTask.task,
    newTask.task_completion,
    newTask.task_description,
  ];

  pool
    .query(queryText, queryDataList)
    .then((toDoResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// PUT

// DELETE

module.exports = toDoRouter;
