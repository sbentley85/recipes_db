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



export default utils;