import React from 'react';
import './IngredientsInput.css';
import Ingredient from '../Ingredient/Ingredient';
import Form from 'react-bootstrap/Form';

class IngredientsInput extends React.Component {
    constructor(props) {
        super(props);
        this.changeUnit = this.changeUnit.bind(this);
    }
    changeUnit(unit, num) {
        console.log(`Unit updated to ${unit} for ingredient number ${num}`);
        
        
    }

    render() {
        const ingredientsArray = [];
        if(this.props.ingredients) {
            for (let i=0; i < this.props.numIngredients; i++) {
                const ingredient = this.props.ingredients[i]
                ingredientsArray.push(<Ingredient ingredient={ingredient} key={i+1} ingredientNum={i+1} changeUnit={this.changeUnit}/>)
            }
        } else {
            for (let i=0; i < this.props.numIngredients; i++) {
                ingredientsArray.push(<Ingredient ingredientNum={i+1} key={i+1} changeUnit={this.changeUnit}/>)
            }
        }


        return (
          <Form>
            {ingredientsArray}
          </Form>  

        );
    }

}

export default IngredientsInput