import React from 'react';
import RecipeList from '../RecipeList/RecipeList';
import utils from '../../utils/utils';
import { Auth0Context } from '../../contexts/auth0-context';




class MyRecipes extends React.Component {
    static contextType = Auth0Context;
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            isLoaded: false,
        }
    }
            
    componentDidMount() {
        const user = this.context.user.email
        utils.getMyRecipes(user).then(recipes => {
            if (recipes.length) {
            
            this.setState({
                recipes: recipes,
                isLoaded: true
            })
            
            }
        })  
    }
            
    render() {
        return (
            <RecipeList recipes={this.state.recipes}/>
        )
    }
    
};

export default MyRecipes