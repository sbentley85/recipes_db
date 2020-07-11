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

  



tagsRouter.get('/', (req,res,next) => {
    
    db.query('SELECT * FROM tags ORDER BY tag_id ASC', (err, tags) => {
       
        if (err) {
            next(err);
        } else {
            res.status(200).json({tags: tags.rows})
        }
    })
})




    




module.exports = tagsRouter;