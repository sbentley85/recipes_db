import 'whatwg-fetch';

const PORT = process.env.PORT;

const baseUrl = '/api'
console.log(PORT);
console.log(process.env.NODE_ENV)
// For local use
// const baseUrl = `http://localhost:4001/api`;
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



export default utils;