const express = require('express');
const usersRouter = express.Router();
const Pool = require('pg').Pool
const db = new Pool(process.env.NODE_ENV === 'production' ? {
    connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
} : {
    user: 'simon',
    host: 'localhost',
    database: 'recipes',
    password: 'Cant0na123',
    port: 5432
  })


usersRouter.param('user', (req, res, next, user) => {
    db.query('SELECT * FROM recipe WHERE user_name = $1', [user], (err, recipes) => {
        if(err) {
            next(err);
        } else if (recipes) {
            req.recipes = recipes;
            next();
            
        } else {
            res.sendStatus(404);
        }
    })
    

    

})



usersRouter.get('/:user', (req, res, next) => {
    res.status(200).json({recipes: req.recipes});
})





module.exports = usersRouter;