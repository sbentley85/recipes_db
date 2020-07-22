import React from 'react';
import RecipeList from '../RecipeList/RecipeList';
import utils from '../../utils/utils';
import { Auth0Context } from '../../contexts/auth0-context';




class MyFavorites extends React.Component {
    static contextType = Auth0Context;
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            isLoaded: false,
        }
        this.mapTags = this.mapTags.bind(this)
    }

    mapTags(tags) {
        
        
        let recipes = this.state.recipes
        for (let i = 0 ; i < tags.length ; i++) {
            // finds index of recipe for each tag
            const recipeIndex = recipes.findIndex(recipe => recipe.id === tags[i].recipe_id)

            const recipeToUpdate = recipes[recipeIndex]
            
            if(recipeToUpdate) {
                if(recipeToUpdate.tags) {
                    recipeToUpdate.tags.push(tags[i].tag)        
                } else {
                    recipeToUpdate.tags = []
                    recipeToUpdate.tags.push(tags[i].tag)        
                }
                
            }
            
            
            recipes[recipeIndex] = recipeToUpdate
            this.setState({
                recipes: recipes,
                isLoaded: true
            })
        } 
        
        
    }
            
    async componentDidMount() {
        const user = this.context.user.email
        await utils.getUserFavorites(user).then(recipes => {
            if (recipes.length) {
            
            this.setState({
                recipes: recipes,
                isLoaded: true
            })
            
            }
        })
        
        await utils.getTags().then(tags => {
                    
            if (tags.length) {
                this.mapTags(tags);
            }
            this.setState({
        
                isLoaded: true
            })
        })
    }
            
    render() {
        return (
            <RecipeList recipes={this.state.recipes}/>
        )
    }
    
};

export default MyFavorites