const express = require('express');
const apiRouter = express.Router();
const recipesRouter = require('./recipes.js');
const usersRouter = require('./users.js');
const tagsRouter = require('./tags.js');
const favoritesRouter = require('./favorites.js');



apiRouter.use('/recipes', recipesRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/tags', tagsRouter);
apiRouter.use('/favorites', favoritesRouter);

module.exports = apiRouter;
