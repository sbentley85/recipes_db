import React, {useContext} from 'react';
import './NewRecipe.css';
import utils from '../../utils/utils'
import IngredientsInput from '../IngredientsInput/IngredientsInput'
import InstructionsInput from '../InstructionsInput/InstructionsInput'
// import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { Auth0Context } from '../../contexts/auth0-context';



class NewRecipe extends React.Component {
    static contextType = Auth0Context;
    constructor (props) {
        super(props);
        this.state = {
            recipe: {
                instructions: [],
                ingredients: [],
                user: '',
                servings: '',
                notes: ''
                
            },
            numIngredients: 5,
            numInstructions: 5

        }
        this.addIngredient = this.addIngredient.bind(this);
        this.removeIngredient = this.removeIngredient.bind(this);
        this.addInstruction = this.addInstruction.bind(this);
        this.removeInstruction = this.removeInstruction.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.updateName = this.updateName.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.updateDifficulty = this.updateDifficulty.bind(this);
        this.updateIngredients = this.updateIngredients.bind(this);
        this.updateInstructions = this.updateInstructions.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.updateServings = this.updateServings.bind(this);
        this.updateNotes = this.updateNotes.bind(this);
    }
    
    async handleSave() {
        // const user = useAuth0();
        
        await this.updateIngredients();
        await this.updateInstructions();
        await this.updateUser();
        utils.createRecipe(this.state.recipe, this.state.numIngredients, this.state.numInstructions).then(
            this.props.history.push('/')
        );
    }

  
    updateName(event) {
        const recipe = JSON.parse(JSON.stringify(this.state.recipe));
        recipe.name = event.target.value;
        this.setState({recipe: recipe});
    }

    updateTime(event) {
        const recipe = JSON.parse(JSON.stringify(this.state.recipe));
        recipe.time = event.target.value;
        this.setState({recipe: recipe});
    }

    updateDifficulty(event) {
        const recipe = JSON.parse(JSON.stringify(this.state.recipe));
        recipe.difficulty = event.target.value;
        this.setState({recipe: recipe});
    }


    updateInstructions() {
        const recipe = JSON.parse(JSON.stringify(this.state.recipe));
        const instructionInputs = document.getElementsByClassName('instructions');
        const instructions = [];
        for(let i = 0; i < Array.from(instructionInputs).length; i++) {
            const text = Array.from(instructionInputs)[i].value;
            const instruction = {
                step: (i+1),
                instruction_text: text
            };
            instructions[i] = instruction;
        }
        recipe.instructions = instructions;
        // this.state.recipe.instructions = instructions;
        this.setState({recipe: recipe});
    }

    updateIngredients() {
        
        const recipe = JSON.parse(JSON.stringify(this.state.recipe));
        const ingredientInputs = document.getElementsByClassName('ingredients');
        const quantityInputs = document.getElementsByClassName('quantity');
        const unitInputs = document.getElementsByClassName('units');
        const ingredients = [];
        for(let i = 0; i < Array.from(ingredientInputs).length; i++) {
            const name = Array.from(ingredientInputs)[i].value;
            const quantity = parseInt(Array.from(quantityInputs)[i].value);
            const units = Array.from(unitInputs)[i].value;
            const num = i + 1
            const ingredient = {
                ingredient_name: name,
                num: num,
                quantity: quantity,
                units: units
            };
            
            ingredients[i] = ingredient;
             
        }
        recipe.ingredients = ingredients;
        this.setState({recipe: recipe});
        // this.state.recipe.ingredients = ingredients;
        
    }

    updateUser() {
        const recipe = JSON.parse(JSON.stringify(this.state.recipe));
        
        const user = this.context.user.email
        recipe.user = user;
        console.log(user);
        this.setState({recipe: recipe});

    }

    updateServings(event) {
        
        const recipe = JSON.parse(JSON.stringify(this.state.recipe));
        recipe.servings = event.target.value;
        this.setState({recipe: recipe});
    }
    updateNotes(event) {
        const recipe = JSON.parse(JSON.stringify(this.state.recipe));
        recipe.notes = event.target.value;
        this.setState({recipe: recipe});
    }

    addIngredient () {
        this.setState({numIngredients: this.state.numIngredients + 1});
    }

    removeIngredient () {
        this.setState({numIngredients: this.state.numIngredients - 1});
    }

    addInstruction () {
        this.setState({numInstructions: this.state.numInstructions + 1}); 
    }

    removeInstruction () {
        this.setState({numInstructions: this.state.numInstructions - 1});
    }

    

    render() {
        
        return (

            <div>
                <Row className="mx-auto">
                    
                        <Form  className='mx-auto mt-1'>
                            <Row>
                                <Col xs={12} lg={6} className="mb-2 mb-lg-0">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control onChange={this.updateName} placeholder="Name" />
                                </Col>
                                <Col>
                                    <Form.Label>Time</Form.Label>
                                    <Form.Control onChange={this.updateTime} placeholder="Time" />
                                </Col>
                                <Col>
                                    <Form.Label>Difficulty</Form.Label>
                                    <Form.Control onChange={this.updateDifficulty} placeholder="Difficulty" />
                                </Col>
                                <Col>
                                    <Form.Label>Servings</Form.Label>
                                    <Form.Control onChange={this.updateServings} placeholder="Servings" />
                                </Col>
                            </Row>
                        </Form>
                </Row>
                <Row className='mx-auto mt-4'>    
                    <Col sm={10} md={8} className="mx-auto justify-content-center text-center">
                        <h4>Ingredients</h4>
                        <IngredientsInput key='1' numIngredients={this.state.numIngredients}/>
                        <Row className='mt-3 justify-content-center'>
                            <Col xs={2} md={1} className='text-center'>
                                <FontAwesomeIcon color='red' onClick={this.removeIngredient} icon={faMinus} size="2x"/>
                            </Col>
                            <Col xs={2} md={1} className='text-center'>
                                <FontAwesomeIcon color='green' onClick={this.addIngredient} icon={faPlus} size="2x" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className='mx-auto mt-4'>
                    <Col lg={8} className="text-center mx-auto">
                        <h4>Instructions</h4>
                        <InstructionsInput key='2' numInstructions={this.state.numInstructions}/>                  
                        <Row className='mt-3 justify-content-center'>
                            <Col xs={2} md={1} className='text-center'>
                                <FontAwesomeIcon color='red' onClick={this.removeInstruction} icon={faMinus} size="2x"/>
                            </Col>
                            <Col xs={2} md={1} className='text-center'>
                                <FontAwesomeIcon color='green' onClick={this.addInstruction} icon={faPlus} size="2x" />
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Row>
                            <Col lg={10} className="text-center mx-auto">
                                <h4>Notes</h4>
                            </Col>
                        </Row>
                        <Row>
                        <Col lg={8} className="text-center mx-auto">
                            
                            <Form.Control onChange={this.updateNotes} placeholder="Notes" />
                        </Col> 
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <ButtonGroup>        
                        <Link to="/"><Button variant="secondary">Back</Button></Link>                    
                        <Button onClick={this.handleSave} variant="secondary">Save</Button>
                        
                    </ButtonGroup>
                </Row>
            </div>
        );
    }
}

export default NewRecipe;