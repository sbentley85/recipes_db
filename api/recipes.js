const express = require('express');
const recipesRouter = express.Router();
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

  

  recipesRouter.param('recipeId', (req, res, next, recipeId) => {
    db.query('SELECT * FROM recipe WHERE id = $1', [recipeId], (err, recipe) => {
        if(err) {
            next(err);
        } else if (recipe) {
            req.recipe = recipe.rows;
            
            db.query('SELECT * FROM ingredients WHERE recipe_id = $1 ORDER BY num ASC', [recipeId], (err, ingredients) => {
                if (err) {
                    next(err);
                } else if (ingredients) {
                    req.recipe[0].ingredients = ingredients.rows;
                    db.query('SELECT * FROM instructions WHERE recipe_id = $1 ORDER BY step ASC', [recipeId], (err, instructions) => {
                        if (err) {
                            next(err);
                        } else if (instructions) {
                            
                            req.recipe[0].instructions = instructions.rows;
                            
                            next();
                        } else {
                            res.sendStatus(404);
                        }
                    })
                } else {
                    res.sendStatus(404);
                }
            })
        } else {
            res.sendStatus(404);
        }
    })

})

recipesRouter.get('/', (req,res,next) => {
    
    db.query('SELECT * FROM recipe ORDER BY id ASC', (err, recipes) => {
       
        if (err) {
            next(err);
        } else {
            res.status(200).json({recipes: recipes.rows})
        }
    })
})

recipesRouter.get('/:recipeId', (req, res, next) => {
    
    res.status(200).json({recipe: req.recipe});
})



    

recipesRouter.post('/', (req, res, next) => {
    const name = req.body.recipe.name;
    const time = req.body.recipe.time;
    const difficulty = req.body.recipe.difficulty;
    const user = req.body.recipe.user;
    const notes = req.body.recipe.notes;
    const servings = req.body.recipe.servings;
    
    db.query('BEGIN');
    const recipeSql = `INSERT INTO recipe (name, time, difficulty, user_name, servings, notes)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`
    
    const recipeValues = [
        name,
        time,
        difficulty,
        user,
        servings,
        notes
        ]
    
    db.query(recipeSql, recipeValues, async function (err, newId) {
        if (err) {
            console.log('error from recipe details posting');
            next(err);
        } else {

            const recipeId = newId.rows[0].id
            const numIngredients = req.body.numIngredients;
            let ingredientsSql = `INSERT INTO ingredients (ingredient_id, recipe_id, num, ingredient_name, quantity, unit) VALUES `
            for (let i = 0; i < numIngredients; i++) {
                const ingredientName = req.body.recipe.ingredients[i].ingredient_name;
                const ingredientNum = req.body.recipe.ingredients[i].num;
                const ingredientQuantity = req.body.recipe.ingredients[i].quantity;
                const ingredientUnits = req.body.recipe.ingredients[i].units;
                
                const newSQL = `(DEFAULT, ${recipeId}, ${ingredientNum}, '${ingredientName}', ${ingredientQuantity}, '${ingredientUnits}')`

                if (i < numIngredients -1) {
                    ingredientsSql +=`${newSQL}, ` 
                } else {
                    ingredientsSql += newSQL
                } 
            }
            
            const ingredientUpload = await db.query(ingredientsSql, function (err) {
                if (err) {
                    next(err);
                }
            })

            const numInstructions = req.body.numInstructions;
            let instructionsSql = `INSERT INTO instructions (instruction_id, recipe_id, step, instruction_text) VALUES `
            for (let i = 0; i < numInstructions; i++) {
                const instructionStep = req.body.recipe.instructions[i].step;
                const instructionText = req.body.recipe.instructions[i].instruction_text;
                const newSQL = `(DEFAULT, ${recipeId}, ${instructionStep}, '${instructionText}')`    
                
                if (i < numInstructions -1) {
                    instructionsSql +=`${newSQL}, ` 
                } else {
                    instructionsSql += newSQL
                }
                
            }
            console.log(instructionsSql);
            const instructionUpload = await db.query(instructionsSql, function (err) {
                if (err) {
                    next(err);
                }
            })


            res.sendStatus(201);
        }
    })
    db.query('COMMIT');
})



recipesRouter.delete('/:recipeId', (req, res, next) => {
    const sql = `DELETE FROM recipe WHERE id = $1`
    
    const values = [
        req.params.recipeId
    ]
    
    db.query(sql, values, (err) => {
        if(err) {
            next(err);
        }
    });
    
    res.sendStatus(200);
    return;
    

})

recipesRouter.put('/:recipeId', (req, res, next) => {
    const name = req.body.recipe.name;
    const time = req.body.recipe.time;
    const difficulty = req.body.recipe.difficulty;
    const notes = req.body.recipe.notes;
    const servings = req.body.recipe.servings;
    const ingredients = JSON.stringify(req.body.recipe.ingredients);
    const instructions = JSON.stringify(req.body.recipe.instructions);
    if(!name || !time || !difficulty || !ingredients || !instructions) {
        return res.sendStatus(400);
        }
    db.query('BEGIN');
        
    const sql = `UPDATE recipe SET name = $1, time = $2, difficulty = $3, notes = $4, servings = $5
     WHERE id = $6`
    const values = [
        name,
        time,
        difficulty,
        notes,
        servings,
        req.params.recipeId
    ]
    db.query(sql, values, function (err) {
        if(err) {
            next(err);
        } else {
            const numIngredients = req.body.numIngredients; 
            for (let i = 0; i < numIngredients; i++) {
                const ingredientName = req.body.recipe.ingredients[i].ingredient_name;
                const ingredientId = req.body.recipe.ingredients[i].ingredient_id;
                const ingredientQuantity = req.body.recipe.ingredients[i].quantity;
                const ingredientUnits = req.body.recipe.ingredients[i].units;
                const ingredientNum = req.body.recipe.ingredients[i].num;
                if(ingredientId != 'new') {
                    const ingredientsSql = `UPDATE ingredients SET ingredient_name = $1, quantity = $2, unit = $3, num = $4
                    WHERE ingredient_id = $5`;
                    const ingredientsValues = [
                        ingredientName,
                        ingredientQuantity,
                        ingredientUnits,
                        ingredientNum,
                        ingredientId
                    ];
                    
                    db.query(ingredientsSql, ingredientsValues, (err) => {
                        if(err) {
                            next(err);
                        }             
                    });
                } else {
                    
                    const ingredientsSql = `INSERT INTO ingredients (ingredient_name, num, recipe_id, unit, quantity) VALUES ($1, $2, $3, $4, $5)`;
                    const ingredientsValues = [
                        ingredientName,
                        ingredientNum,
                        req.body.recipe.id,
                        ingredientUnits,
                        ingredientQuantity
                    ];
                    db.query(ingredientsSql, ingredientsValues, (err) => {
                        if(err) {
                            next(err);
                        }             
                    });
                }
                
                
                
            }
            const numInstructions = req.body.numInstructions;
            for (let i = 0; i < numInstructions; i++) {
                const instructionText = req.body.recipe.instructions[i].instruction_text;
                
                const instructionStep = req.body.recipe.instructions[i].step;
                // const ingredientNum = req.body.recipe.ingredients[i].num;
                const instructionId = req.body.recipe.instructions[i].instruction_id;
                if(instructionId != 'new') {
                    const instructionsSql = `UPDATE instructions SET instruction_text = $1
                    WHERE instruction_id = $2`;
                    const instructionsValues = [
                        instructionText,
                        instructionId
                    ];
                    console.log(instructionsSql);
                    console.log(instructionsValues);
            
                    db.query(instructionsSql, instructionsValues, (err) => {
                        if(err) {
                            next(err);
                        }                
                    });
                } else {
                    const instructionsSql = `INSERT INTO instructions (step, instruction_text, recipe_id)
                     VALUES ($1, $2, $3)`;
                    const instructionsValues = [
                        instructionStep,
                        instructionText,
                        req.body.recipe.id
                    ];
            
                    db.query(instructionsSql, instructionsValues, (err) => {
                        if(err) {
                            next(err);
                        }                
                    });
                }
                
            }
            res.sendStatus(200);
        }           
    })
    db.query('COMMIT');
    

})


module.exports = recipesRouter;