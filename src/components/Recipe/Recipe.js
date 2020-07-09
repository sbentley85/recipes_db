import React from 'react';
import './Recipe.css';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

class Recipe extends React.Component {
    render() {
        return (
            <Link to={`/recipes/${this.props.recipe.id}`}>
            <Card text='center'>
                
                <Card.Body>
                    <Card.Title>{this.props.recipe.name}</Card.Title>
                    <Card.Text>
                                       
                        <p>Time: {this.props.recipe.time}</p>
                        <p>Difficulty: {this.props.recipe.difficulty}</p>
                    </Card.Text>
                </Card.Body>
            </Card>
            </Link>
        );
    }
}

export default Recipe;