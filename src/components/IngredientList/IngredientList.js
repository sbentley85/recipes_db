import React from 'react';
import './IngredientList.css';
import IngredientDetail from '../IngredientDetail/IngredientDetail'


class IngredientList extends React.Component {
    

    render () {
        
        
        if (this.props.ingredients) {
            
            const ingredients = this.props.ingredients.map((ingredient) => 
                <IngredientDetail key={ingredient.id} ingredient={ingredient}/>)
                return (
                <>{ingredients}</>
                )
            

            
        } else {
            return null;
        }
        

    }

    

}

export default IngredientList