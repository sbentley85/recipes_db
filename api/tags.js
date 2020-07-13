const express = require('express');
const tagsRouter = express.Router();
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
  })

  
  tagsRouter.param('tag', (req, res, next, tag) => {
    ;(async () => {
      
      const client = await db.connect();
      
      try {

        await client.query('SELECT * FROM tags WHERE tag = $1', [tag], (err, tags) => {
          
          req.tags = tags.rows;

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


tagsRouter.get('/', (req,res,next) => {
    
    db.query('SELECT * FROM tags ORDER BY tag_id ASC', (err, tags) => {
       
        if (err) {
            next(err);
        } else {
            res.status(200).json({tags: tags.rows})
        }
    })
})

tagsRouter.get('/:tag', async (req, res, next) => {

  
  ;(async () => {
    const client = await db.connect();

    try {
      req.recipes = []
      for (let i=0; i < req.tags.length; i++) {
        await client.query('SELECT * FROM recipe WHERE id = $1', [req.tags[i].recipe_id], (err, recipe) => {
          
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




    




module.exports = tagsRouter;