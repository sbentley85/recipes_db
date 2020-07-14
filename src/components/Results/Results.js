import React from 'react';
import { Link } from 'react-router-dom';
import Recipe from '../Recipe/Recipe';

import CardDeck from 'react-bootstrap/CardDeck';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../Pagination/Pagination.css';
import ReactPaginate from 'react-paginate';




class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
            recipesPerPage: 30,
            pageCount: 1,
            currentPage: 1,
            displayedRecipes: []
        }
        this.handlePageClick = this.handlePageClick.bind(this)
    }

    componentWillReceiveProps () {
        if(this.props.recipes.length != 0) {
            const firstRecipe = 0
            console.log(this.props.recipes)
            const recipesCount = this.props.recipes.length
            const lastRecipe = firstRecipe + this.state.recipesPerPage
            const pageCount = Math.ceil(recipesCount / this.state.recipesPerPage)
            this.setState({
                displayedRecipes: this.props.recipes.slice(firstRecipe, lastRecipe),
                pageCount: pageCount,
                recipesCount: recipesCount
            })
        }
    }
    
    handlePageClick (event) {
        console.log(event.selected);
        const pageClicked = event.selected + 1;
        const firstRecipe = 0 + ((pageClicked -1) * this.state.recipesPerPage)
        const lastRecipe = firstRecipe + this.state.recipesPerPage



        this.setState({
            currentPage: pageClicked,
            displayedRecipes: this.props.recipes.slice(firstRecipe, lastRecipe)
        })
    }

    render () {
        return (
            <Row>
                <Col>
                    <Row>
                    <Col>
                        <CardDeck>
                        {this.state.displayedRecipes.map(recipe => {       
                            return <Recipe recipe={recipe} key={recipe.id} />
                        })}
                        </CardDeck>
                    </Col>
                    </Row>
                    <Row >
                        <Col lg={8} className="mt-4 mx-auto text-center">
                        <div className="wrapper mx-auto text-center">
                            <ReactPaginate
                                previousLabel={'previous'}
                                nextLabel={'next'}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={this.state.pageCount}
                                marginPagesDisplayed={1}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={'pagination'}
                                subContainerClassName={'pages pagination'}
                                activeClassName={'active'}
                                
                            />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        
        )
    }
    
}

export default Results