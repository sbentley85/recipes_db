import 'whatwg-fetch';

const baseUrl = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001/api'

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

utils.getTaggedRecipes = async (tag) => {
    
  const url = `${baseUrl}/tags/${tag}`;
  return await fetch(url).then(response => {
      if (!response.ok) {
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

utils.getRecipe = async (id, user) => {
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

utils.getTags = async () => {
    
  const url = `${baseUrl}/tags`;
  return await fetch(url).then(response => {
      if (!response.ok) {
          console.log('got tags');
          return new Promise(resolve => resolve([]));
        }
      
      return response.json().then(jsonResponse => {
         
        return jsonResponse.tags;

      })
  })

};

utils.addFavorite = async (user, recipeId) => {
  
  const url = `${baseUrl}/favorites`;
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: user,
      recipeId: recipeId
    })
  }

  return await fetch(url, fetchOptions)


}

utils.removeFavorite = async (user, recipeId) => {
  const url = `${baseUrl}/favorites`;
  const fetchOptions = {
      method: 'DELETE',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: user,
        recipeId: recipeId
      })
  };
  return await fetch(url, fetchOptions) 
}

utils.getUserFavorites = async (user) => {
  const url = `${baseUrl}/favorites/${user}`;
  return await fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      
      return jsonResponse.favorites;
    });
  });
}





export default utils;