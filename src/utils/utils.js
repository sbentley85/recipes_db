import 'whatwg-fetch';

const PORT = process.env.PORT;
console.log(process.env.NODE_ENV)
const baseUrl = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001/api'

console.log(baseUrl)

console.log(process.env.NODE_ENV)

const utils = {};


utils.getRecipes = async () => {
    
    const url = `${baseUrl}/recipes`;
    return await fetch(url).then(response => {
        if (!response.ok) {
            console.log('got recipes');
            return new Promise(resolve => resolve([]));
          }
        
        return response.json().then(jsonResponse => {
           
          return jsonResponse.recipes;

        })
    })

};

utils.getMyRecipes = async (user) => {
    
    const url = `${baseUrl}/users/${user}`;
    return await fetch(url).then(response => {
        if (!response.ok) {
            return new Promise(resolve => resolve([]));
          }
        
        return response.json().then(jsonResponse => {
            
            return jsonResponse.recipes.rows;
        })
    })
  
  };

utils.getRecipe = async id => {
    const url =`${baseUrl}/recipes/${id}`;
    return await fetch(url).then(response => {
        if (!response.ok) {
          return new Promise(resolve => resolve(null));
        }
        return response.json().then(jsonResponse => {
          return jsonResponse.recipe;
        });
      });


}

utils.createRecipe =  async (recipe, numIngredients, numInstructions) => {
    const url = `${baseUrl}/recipes`;
    const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recipe: recipe,
          numIngredients: numIngredients,
          numInstructions: numInstructions
          
        })
      };
    return await fetch(url, fetchOptions) /*.then(response => {
        if (!response.ok) {
          return new Promise(resolve => resolve(null));
        }
        return response.json().then(jsonResponse => {
          return jsonResponse.recipe;
        });
      }); */ 
};

utils.deleteRecipe = async (recipeId) => {
    const url = `${baseUrl}/recipes/${recipeId}`;
    const fetchOptions = {
        method: 'DELETE'
    };
    return await fetch(url, fetchOptions) /* caused .then on handleSave not to run?
    .then(response => {
        if (!response.ok) {
          return new Promise(resolve => resolve(null));
        }
        return response.json().then(jsonResponse => {
          return jsonResponse.recipe;
        });
      }); */
}

utils.editRecipe = async (recipe, numIngredients, numInstructions) => {
  const url = `${baseUrl}/recipes/${recipe.id}`;
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      recipe: recipe,
      numIngredients: numIngredients,
      numInstructions: numInstructions
    })
  };
  return await fetch(url, fetchOptions) /* .then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.recipe;
    });
  }); */ 

};


export default utils;