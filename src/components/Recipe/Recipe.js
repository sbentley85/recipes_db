import React from 'react';
import './Recipe.css';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

class Recipe extends React.Component {
    render() {
        return (
            <Link to={`/recipes/${this.props.recipe.id}`}>
            <Card text='center'>
                
                <Card.Body>
                    <Card.Title>{this.props.recipe.name}</Card.Title>
                    
                                       
                        <div className="card-text"><FontAwesomeIcon icon={faClock} size="1x"/>{`  ${this.props.recipe.time}`}</div>
                        
                    
                </Card.Body>
            </Card>
            </Link>
        );
    }
}

export default Recipe;