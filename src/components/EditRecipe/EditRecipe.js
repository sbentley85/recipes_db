import React from 'react';
import './EditRecipe.css';
import utils from '../../utils/utils'
import IngredientsInput from '../IngredientsInput/IngredientsInput'
import InstructionsInput from '../InstructionsInput/InstructionsInput'
// import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';


class EditRecipe extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            recipe: {
                id: this.props.match.params.id,
                instructions: [],
                ingredients: []
                
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
        this.updateNotes = this.updateNotes.bind(this);
        this.updateServings = this.updateServings.bind(this);
        
    }
    
    async handleSave() {
        await this.updateName();
        await this.updateTime();
        await this.updateDifficulty();
        await this.updateIngredients();
        await this.updateInstructions();
        await this.updateNotes();
        await this.updateServings();
        await utils.editRecipe(this.state.recipe, this.state.numIngredients, this.state.numInstructions) /*.then(
            
            this.props.history.push('/')
        ); */
        this.props.history.push(`/recipes/${this.state.recipe.id}`);
    }

    componentDidMount() {
        utils.getRecipe(this.state.recipe.id).then(recipe => {
            if (recipe) {
                this.setState({
                    recipe: recipe[0],
                    numIngredients: recipe[0].ingredients.length,
                    numInstructions: recipe[0].instructions.length
                })
            }
        })
    }
  
    updateName(event) {
        const recipe = JSON.parse(JSON.stringify(this.state.recipe));
        const nameInput = document.querySelector('#name')
        recipe.name = nameInput.value;
        this.setState({recipe: recipe});
    }

    updateTime(event) {
        const recipe = JSON.parse(JSON.stringify(this.state.recipe));
        const timeInput = document.querySelector('#time')
        recipe.time = timeInput.value;
        this.setState({recipe: recipe});
    }

    updateDifficulty(event) {
        const recipe = JSON.parse(JSON.stringify(this.state.recipe));
        const difficultyInput = document.querySelector('#difficulty')
        recipe.difficulty = difficultyInput.value;
        this.setState({recipe: recipe});
    }


    async updateInstructions() {
        const recipe = await JSON.parse(JSON.stringify(this.state.recipe));
        
        const instructionInputs = document.getElementsByClassName('instructions');
        const instructions = [];
        for(let i = 0; i < Array.from(instructionInputs).length; i++) {
            const text = Array.from(instructionInputs)[i].value;
            
            if(recipe.instructions[i]) {
                const instruction = {
                    step: (i+1),
                    instruction_text: text,
                    instruction_id: recipe.instructions[i].instruction_id                    
    
                };
                instructions[i] = instruction;
            } else {
                const instruction = {
                    step: (i+1),
                    instruction_text: text,
                    instruction_id: 'new'                   
    
                };
                instructions[i] = instruction;
            }
            
        }
        recipe.instructions = instructions;
        await this.setState({recipe: recipe})
        
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
            if(this.state.recipe.ingredients[i]) {
                const ingredient = {
                    ingredient_name: name,
                    num: num,
                    ingredient_id: this.state.recipe.ingredients[i].ingredient_id,
                    quantity: quantity,
                    units: units
                    // recipe_id: this.state.recipe.ingredients[i].recipe_id
                };
                ingredients[i] = ingredient;
            } else {
                const ingredient = {
                    ingredient_name: name,
                    num: num,
                    ingredient_id: 'new',
                    quantity: quantity,
                    units: units
                    // recipe_id: this.state.recipe.ingredients[i].recipe_id
                };
                ingredients[i] = ingredient;
            }
            
 
        }
        recipe.ingredients = ingredients;
        this.setState({recipe: recipe})
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

    updateNotes(event) {
        const recipe = JSON.parse(JSON.stringify(this.state.recipe));
        const notesInput = document.querySelector('#notes')
        recipe.notes = notesInput.value;
        this.setState({recipe: recipe});
    }

    updateServings(event) {
        const recipe = JSON.parse(JSON.stringify(this.state.recipe));
        const servingsInput = document.querySelector('#servings')
        recipe.servings = servingsInput.value;
        this.setState({recipe: recipe});
    }

    render() {

        return (
            <div>
                <Row  className="mx-auto">
                    <Col>
                    <Row>
                        <Col className="text-center">
                            <h4>Details</h4> 
                        </Col>
                    </Row>
                    
                    <Row>
                        <Form className='mx-auto mt-1'>
                            <Row>
                                <Col xs={12} lg={6} className="mb-2 mb-sm-0">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control id='name' onChange={this.updateName} value={this.state.recipe.name} />
                                </Col>
                                <Col>
                                    <Form.Label>Time</Form.Label>
                                    <Form.Control id='time' onChange={this.updateTime} value={this.state.recipe.time} />
                                </Col>
                                <Col>
                                    <Form.Label>Difficulty</Form.Label>
                                    <Form.Control id='difficulty' onChange={this.updateDifficulty} value={this.state.recipe.difficulty} />
                                </Col>
                                <Col>
                                    <Form.Label>Servings</Form.Label>
                                    <Form.Control id='servings' onChange={this.updateServings} value={this.state.recipe.servings} />
                                </Col>
                            </Row>
                        </Form>
                    </Row>
                    </Col>
                </Row>    
                <Row className='mx-auto mt-4'>  
                    <Col sm={10} md={8} className="mx-auto justify-content-center text-center">
                        <h4>Ingredients</h4>                     
                        <IngredientsInput key='1' ingredients={this.state.recipe.ingredients} numIngredients={this.state.numIngredients}/>
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
                        <InstructionsInput key='2' instructions={this.state.recipe.instructions} numInstructions={this.state.numInstructions}/>                  
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
                <Row className='mx-auto mt-4'>
                    <Col>
                        <Row className='mt-3 justify-content-center'>
                            <Col lg={10} className="text-center mx-auto">
                            <h4>Notes</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col Col lg={8} className="text-center mx-auto">
                                <Form.Control id="notes" onChange={this.updateNotes} placeholder="Notes" value={this.state.recipe.notes}/>    
                            </Col>
                        </Row>
                    </Col>
                </Row>      
                
                <Row>
                    <ButtonGroup>
                        <Button variant="secondary" href={"/recipes/" + this.state.recipe.id}>Back</Button>{' '}
                        
                        <Button variant="secondary" onClick={this.handleSave}>Save</Button>
                        
                    </ButtonGroup>
                </Row>
            </div>
        );
    }
}

export default EditRecipe;