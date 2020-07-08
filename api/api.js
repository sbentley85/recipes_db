const express = require('express');
const apiRouter = express.Router();
const recipesRouter = require('./recipes.js');
// const usersRouter = require('./users.js');



apiRouter.use('/recipes', recipesRouter);
// apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
