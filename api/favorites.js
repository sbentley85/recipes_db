const express = require('express');
const favoritesRouter = express.Router();
const path=require('path');
require('dotenv').config({path:path.resolve(__dirname, '../.env')});

const Pool = require('pg').Pool
const db = new Pool(process.env.NODE_ENV === 'production' ? {
    connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
    } : {
        user: process.env.LOCAL_DB_USER,
        host: process.env.LOCAL_DB_HOST,
        database: process.env.LOCAL_DB_DATABASE,
        password: process.env.LOCAL_DB_PASSWORD,
        port: process.env.LOCAL_DB_PORT
    }
)

  
favoritesRouter.param('user_name', (req, res, next, userName) => {
;(async () => {
    
    const client = await db.connect();
    
    try {

    await client.query('SELECT * FROM favorites WHERE user_name = $1', [userName], (err, favorites) => {
        
        req.favorites = favorites.rows;

    })
    
    await client.query('COMMIT');

    } catch (e) {
    await client.query('COMMIT');
    throw e

    } finally {
    client.release();
    next();

    }



})().catch(e => console.error(e.stack))


})

/*
favoritesRouter.get('/', (req,res,next) => {
    
    db.query('SELECT * FROM tags ORDER BY tag_id ASC', (err, tags) => {
       
        if (err) {
            next(err);
        } else {
            res.status(200).json({tags: tags.rows})
        }
    })
})
*/

favoritesRouter.get('/:user_name', async (req, res, next) => {

  
  ;(async () => {
    const client = await db.connect();

    try {
      req.recipes = []
      for (let i=0; i < req.favorites.length; i++) {
        await client.query('SELECT * FROM recipe WHERE id = $1', [req.favorites[i].recipe_id], (err, recipe) => {
          
          req.recipes[i] = recipe.rows[0];
          
          
        })
        
      }
      await client.query('COMMIT'); 
    } catch (e) {

      await client.query('COMMIT');
      throw e
    } finally {
      client.release();
      res.status(200).json({recipes: req.recipes});

    }

  })().catch(e => console.error(e.stack))


   
  
})

favoritesRouter.post('/', (req, res, next) => {
    const user = req.body.user;
    const recipeId = req.body.recipeId;

    ;(async () => {
        const client = await db.connect();
        try {
            await client.query('BEGIN')
            const favoriteSql = `INSERT INTO favorites (user_name, recipe_id)
            VALUES ($1, $2)`
            const favoriteValues = [
                user,
                recipeId
            ]

            await client.query(favoriteSql, favoriteValues)
            await client.query('COMMIT')
        } catch (e) {
            await client.query('COMMIT')
            throw e 
        } finally {
            client.release()
            res.sendStatus(200)
        }
    })().catch(e => console.error(e.stack))


})

favoritesRouter.delete('/', (req, res, next) => {
    const user = req.body.user;
    const recipeId = req.body.recipeId;
    console.log(req.body)
        
    const sql = `DELETE FROM favorites WHERE user_name = $1 AND recipe_id = $2`
    const values = [
        user,
        recipeId
    ]
    
    db.query(sql, values, (err) => {
        if(err) {
            next(err)
        }
    });

    res.sendStatus(200);
    return;
})




    




module.exports = favoritesRouter;