import React from 'react';
import './Ingredient.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Ingredient extends React.Component {
        
    constructor (props) {
        super(props);
        this.state = {

        }
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange (event) {
        this.props.changeUnit(event.target.value, this.props.ingredient.num);
        this.setState({newUnit: event.target.value})
    }

    render() {
        if(this.props.ingredient) {
            const ingredientName = this.props.ingredient.ingredient_name
            const ingredientQuantity = this.props.ingredient.quantity
            const ingredientUnit = this.props.ingredient.unit
            return (
                <Row className='mt-2 justify-content-center'>
                    <Col xs={10} lg={6} className="mb-2 mb-sm-0">
                        <Form.Control  className="ingredients" defaultValue={ingredientName} />
                    </Col>
                    <Col xs={5} lg={2}>
                        <Form.Control className="quantity" defaultValue={ingredientQuantity}/>
                    </Col>
                    <Col xs={5} lg={2}>
                        <Form.Control as='select' name="units" className="units" value={(this.state.newUnit || ingredientUnit)} onChange={this.handleChange}>
                            <option value=" "> </option>
                            <option value="g">g</option>
                            <option value="kg">kg</option>
                            <option value="ml">ml</option>
                            <option value="l">l</option>
                            <option value="oz">oz</option>
                            <option value="lb">lb</option>
                            <option value="cup">cup</option>
                            <option value="ts">ts</option>
                            <option value="tbs">tbs</option>
                        </Form.Control>
                    </Col>
                </Row>)
        } else {
            const ingredientString = `Ingredient ${this.props.ingredientNum}`
            return (
                <Row className='mt-2 justify-content-center'>
                    <Col xs={10} lg={6} className="mb-2 mb-sm-0">
                        
                        <Form.Control className="ingredients" placeholder={ingredientString} />
                    </Col>
                    <Col xs={5} lg={2}>
                        <Form.Control className="quantity" />
                    </Col>
                    <Col xs={5} lg={2}>
                        <Form.Control as='select' name="units" className="units">
                            
                            <option value=""></option>
                            <option value="g">g</option>
                            <option value="kg">kg</option>
                            <option value="ml">ml</option>
                            <option value="l">l</option>
                            <option value="lb">lb</option>
                            <option value="cup">cup</option>
                            <option value="ts">ts</option>
                            <option value="tbs">tbs</option>

                        </Form.Control>
                    </Col>
                </Row>
            )
        }
        
        
    }

}

export default Ingredient