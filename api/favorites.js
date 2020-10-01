const express = require('express');
const favoritesRouter = express.Router();
const path=require('path');
require('dotenv').config({path:path.resolve(__dirname, '../.env')});

const Pool = require('pg').Pool
// creates db with either production or developement details
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
    // attaches user favorites to request
    ;(async () => {
        
        const client = await db.connect();
        
        try {

        await client.query('SELECT * FROM favorites, recipe WHERE favorites.user_name = $1 AND recipe.id = favorites.recipe_id', [userName], (err, favorites) => {
            
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



favoritesRouter.get('/:user_name', async (req, res, next) => {
    // returns user favorites as json and status 200
    res.status(200).json({recipes: req.favorites});

  
})


favoritesRouter.post('/', (req, res, next) => {
    // adds a new row to favorites table with user id an recipe id

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
    // unfavorites a recipe, removes from favorites table

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