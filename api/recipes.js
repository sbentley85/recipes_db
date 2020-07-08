const express = require('express');
const recipesRouter = express.Router();

recipesRouter.get('/', (req, res, next) => {
    console.log('getting recipes');
    res.sendStatus(200);
})

module.exports = recipesRouter;