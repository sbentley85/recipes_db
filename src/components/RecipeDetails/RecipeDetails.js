import React from 'react';
import './RecipeDetails.css';
import utils from '../../utils/utils';
import IngredientList from '../IngredientList/IngredientList';
import InstructionList from '../InstructionList/InstructionList'
import Tags from '../Tags/Tags'
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Auth0Context } from '../../contexts/auth0-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';


class RecipeDetails extends React.Component {
    static contextType = Auth0Context;
    constructor(props) {
        super(props);
        this.state = {
            recipe: {},
            edit: false
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        // this.renderButtons = this.renderButtons.bind(this);
        
    }

    componentDidMount() {
        
        const recipeDetails = document.querySelector('.Recipe-details-container')
        utils.getRecipe(this.props.match.params.id).then(recipe => {
            if (recipe) {
                this.setState({
                    recipe: recipe[0]
                    
                })
            } else {
                recipeDetails.style.display = 'none';
            }
        })
    }

    handleDelete () {
        utils.deleteRecipe(this.state.recipe.id).then(() => {
            console.log('now redirecting')
            this.props.history.push('/');
        }) 

        // utils.deleteRecipe(this.state.recipe.id);
        // this.props.history.push('/');
    }

    handleEdit() {
        const editButton = document.querySelector('.edit');
        const saveButton = document.querySelector('.save');
        editButton.style.display = 'none';
        saveButton.style.display = 'inline-block';
        this.setState({edit: true});

    }

    handleUpdate() {
        utils.editRecipe(this.state.recipe);
        const editButton = document.querySelector('.edit');
        const saveButton = document.querySelector('.save');
        editButton.style.display = 'inline-block';
        saveButton.style.display = 'none'

    }

    checkUser() {

    }

    renderButtons() {
        if (this.context.isLoading) {
            return(
                <ButtonGroup>
                            
                    <Link to="/"><Button variant="secondary">Back</Button></Link>
                    
                    
                </ButtonGroup>)
        }
        if (!this.context.user) {
            return(
                <ButtonGroup>
                            
                    <Link to="/"><Button variant="secondary">Back</Button></Link>
                    
                    
                </ButtonGroup>)
        } else {
            if (this.context.user.email === this.state.recipe.user_name) {
                return(
                    <ButtonGroup>
                                
                        <Link to="/"><Button variant="secondary">Back</Button></Link>
                        <Link to={"/recipes/" + this.state.recipe.id + "/edit"}><Button variant="secondary">Edit</Button></Link>
                        <Button variant="secondary" onClick={this.handleDelete}>Delete</Button>
                        
                    </ButtonGroup>)
            } else {
                return(
                    <ButtonGroup>
                                
                        <Link to="/"><Button variant="secondary">Back</Button></Link>
                        
                        
                    </ButtonGroup>)
            }
        }


        
        
    } 
        
    

   

    render() {
        const recipe = this.state.recipe;
        console.log(this.context)
        return (
            <div className="Recipe-details-container">
                <Row>
                    <Col className="recipe-image">
                        <div className='img-wrapper'>
                            <img src={this.state.recipe.image_url} />
                        </div>
                    </Col>
                </Row>
                <Row className='mx-auto mt-4'>
                    <Col lg={8} className='mx-auto bg-white  detail-group'>
                        <Row>
                            <Col className="text-center mt-2">
                            <h4>{recipe.name}</h4>
                            </Col>
                        </Row>
                        <Row className='mx-auto mt-1'>
                            
                                    
                                    <Col className="text-center">
                                        <p><FontAwesomeIcon icon={faClock} size="1x"/>{` ${recipe.time}`}</p>
                                    </Col>
                                    <Col className="text-center">
                                        <p>Difficulty: {recipe.difficulty}</p>
                                    </Col>
                                    <Col className="text-center">
                                        <p>Servings: {recipe.servings}</p>
                                    </Col>
                                
                        </Row>
                    </Col>
                </Row>
                <Row className='mx-auto mt-4'>
                    <Col lg={4} className='ingredients-details mx-auto  bg-white detail-group'>
                        <Row>
                            <Col className="text-center mt-2">
                                <h4>Ingredients:</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='text-center'><h5>Name</h5></Col>
                            <Col className='text-center'><h5>Quantity</h5></Col>
                            
                        </Row>
                        <IngredientList ingredients={this.state.recipe.ingredients}/>
                    </Col>
                    <Col lg={7} xl={6} className='instructions-details mx-auto  bg-white detail-group'>
                        <Row>
                            <Col className="text-center mt-2">
                                <h4>Instructions: </h4>
                            </Col>
                        </Row>
                        <Row>
                            <InstructionList instructions={this.state.recipe.instructions}/>
                        </Row>
                    </Col> 
                </Row>
                
                       
                    
                
                <Row className='mx-auto mt-4'>
                    <Col Col lg={8} className='mx-auto  bg-white detail-group'>
                        <Row>
                            <Col className="text-center mt-2">
                                <h4>Notes:</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center pb-2">
                                {recipe.notes}
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>

                <Row className='mx-auto mt-4'>
                    <Col Col lg={8} className='mx-auto my-2 tag-container'>
                        <Tags tags={this.state.recipe.tags}/>
                    </Col>
                </Row>
                
                <Row className='mx-auto mt-4'>
                    {this.renderButtons()}
                </Row>
            </div>
        );
    }
}

export default RecipeDetails;