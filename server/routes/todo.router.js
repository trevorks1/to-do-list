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
  //   taskCompletion: 'testName',
  //   task_description: 'testName',
  // }
  const newTask = req.body;
  const queryText = `INSERT INTO "todo" ("name", "task", "task_completion", "task_description")
  VALUES ($1, $2, $3, $4);`;
  const queryDataList = [
    newTask.nameIn,
    newTask.taskIn,
    newTask.taskCompletionIn,
    newTask.descriptionIn,
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
toDoRouter.put('/:taskId', (req, res) => {
  const queryText = `UPDATE "todo" SET "task_completion"=TRUE WHERE "id"=$1;`;
  const queryData = [req.params.taskId];

  pool
    .query(queryText, queryData)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// DELETE
toDoRouter.delete('/:id', (req, res) => {
  const queryText = `DELETE FROM "todo" WHERE "id"=$1;`;
  const queryData = [req.params.id];

  pool
    .query(queryText, queryData)
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = toDoRouter;
