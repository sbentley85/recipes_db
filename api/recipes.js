const express = require('express');
const recipesRouter = express.Router();

const Pool = require('pg').Pool
const db = new Pool({
    connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})



recipesRouter.get('/', (req,res,next) => {
    console.log('getting recipes')
    db.query('SELECT * FROM recipe ORDER BY id ASC', (err, recipes) => {
        if (err) {
            
            next(err);
        } else {
            
            res.status(200).json({recipes: recipes.rows})
        }
    })
})

module.exports = recipesRouter;