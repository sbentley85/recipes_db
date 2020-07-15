import React from 'react';
import './Recipe.css';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

class Recipe extends React.Component {
    render() {

        if (this.props.recipe.image_url !== null) {

            return (
                <Link to={`/recipes/${this.props.recipe.id}`}>
                <Card text='center'>
                <Card.Img src={this.props.recipe.image_url} alt="Card image" />
                <Card.ImgOverlay>
                    <Card.Body className ="with-image">
                        <Card.Title className ="with-image">{this.props.recipe.name}</Card.Title>           
                            <div className="card-text with-image"><FontAwesomeIcon icon={faClock} size="1x"/>{`  ${this.props.recipe.time}`}</div>
                    </Card.Body>
                </Card.ImgOverlay>
                </Card>
                </Link>
            );
        } else {
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
}

export default Recipe;