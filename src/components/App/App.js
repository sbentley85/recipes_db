import React from 'react';
import RecipeList from '../RecipeList/RecipeList';
import RecipeDetails from '../RecipeDetails/RecipeDetails';
import EditRecipe from '../EditRecipe/EditRecipe';
import NewRecipe from '../NewRecipe/NewRecipe';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import './App.css';

import PrivateRoute from '../auth/PrivateRoute';
import NavBar from '../NavBar/NavBar';
import MyRecipes from '../MyRecipes/MyRecipes';
import MyFavorites from '../MyFavorites/MyFavorites';
import TaggedRecipes from '../Tags/TaggedRecipes';
//
function App() {
  return (
    <Router>
        <Container fluid>
          
          <NavBar />
          <Route exact path='/' component={RecipeList} />
          <Route exact path='/recipes/:id' component={RecipeDetails} />         
          <PrivateRoute exact path='/recipe/new' component={NewRecipe} />
          <PrivateRoute path='/recipes/:id/edit' component={EditRecipe} />
          <PrivateRoute exact path='/myRecipes' component={MyRecipes} />
          <PrivateRoute path='/myFavorites' component={MyFavorites} />
          <Route exact path='/tags/:tag' component={TaggedRecipes} />
        </Container>
    </Router>
  );
}

export default App;
