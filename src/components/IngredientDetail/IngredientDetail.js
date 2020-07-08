import React from 'react';
import './IngredientDetail.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class IngredientDetail extends React.Component {
    
    render() {
        
        return (
            <Row>
                <Col className='text-center'>
                    <p>{this.props.ingredient.ingredient_name}</p>
                </Col>
                <Col className='text-center'>
                    <p>{`${this.props.ingredient.quantity}${this.props.ingredient.unit === null ? '' : this.props.ingredient.unit}`}</p>
                </Col>
                
            </Row>
            
        )
    }

}

export default IngredientDetail