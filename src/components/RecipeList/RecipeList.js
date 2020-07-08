import React from 'react';
import './RecipeList.css';
import utils from '../../utils/utils';
import Recipe from '../Recipe/Recipe';
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
    
}

    async componentDidMount() {

        
        
        if(!this.props.recipes) {
            utils.getRecipes().then(recipes => {
                if (recipes.length) {
                    
                    this.setState({
                        recipes: recipes,
                        isLoaded: true
                    })
                    
                }
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
    

    render() {
        const recipes = this.props.recipes ? this.props.recipes : this.state.recipes;
        const value = this.state.value
        if(this.state.isLoaded) {
        return (

                <div className="RecipeList">
                    <Row className="mb-3">
                        <Col xs={6} className='mx-auto text-center'>
                            <Form.Control type="text" value={value} onChange={this.handleChange} placeholder="Filter by name" />
                        </Col>
                    </Row>
                    <CardDeck>
                        <FilterResults
                            value={value}
                            data={recipes}
                            renderResults={results => (
                                results.map(recipe => {
                                    return <Recipe recipe={recipe} key={recipe.id} />
                                })
                            )}/>
                     
                        
                    
                    </CardDeck>
                    <div className="buttons">
                    
                    
                    </div>
                </div>
                
            

        );
        } else {
            return null;
        }
    }
}

export default RecipeList;