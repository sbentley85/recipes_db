import React from 'react';
import './RecipeList.css';
import utils from '../../utils/utils';
import Results from '../Results/Results';

import { Link } from 'react-router-dom';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';
import FilterResults from 'react-filter-search';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

class RecipeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {            
            isLoaded: false,
            value: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.mapTags = this.mapTags.bind(this);
    
}

    async componentDidMount() {

        if(!this.props.recipes) {
            await utils.getRecipes().then(recipes => {
                
                if (recipes.length) {
                    
                    this.setState({
                        recipes: recipes
                        
                    })
                    
                }
                utils.getTags().then(tags => {
                    
                    if (tags.length) {
                        this.mapTags(tags);
                    }
                    this.setState({
                
                        isLoaded: true
                    })
                })

            })
        } else {
            this.setState({
                
                isLoaded: true
            })  
        } 
      }

    handleChange(event) {
        const { value } = event.target;
        this.setState({ value });
    }

    mapTags(tags) {
        
        if(this.props.recipes) {
            let recipes = this.props.recipes
            console.log(recipes)


        } else {
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
        
        
        
        
    }
    

    render() {
        const recipes = this.props.recipes ? this.props.recipes : this.state.recipes;
        const value = this.state.value
        if(this.state.isLoaded) {
        return (

                <div className="RecipeList">
                    <Row className="mb-3">
                        <Col xs={8} className='mx-auto text-center'>
                            <Form.Control type="text" value={value} onChange={this.handleChange} placeholder="Filter by name, tag, difficulty or time" />
                        </Col>
                    </Row>
                    
                    <FilterResults
                        value={value}
                        data={recipes}
                        renderResults={results => (
                            
                            <Results recipes={results}/>
                            /* results.map(recipe => {
                                
                                return <Recipe recipe={recipe} key={recipe.id} />
                            }) */
                        )}/>
                     
                        
                    
                    
                    <div className="buttons">
                    <Link to="/recipe/new" className="button"><Button variant="secondary">New Recipe</Button></Link>
                    
                    </div>
                </div>
                
            

        );
        } else {
            return null;
        }
    }
}

export default RecipeList;