import React, { useContext, useState, useEffect } from 'react';
import RecipeList from '../RecipeList/RecipeList';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import './App.css';
import { Auth0Context } from '../../contexts/auth0-context';
import PrivateRoute from '../auth/PrivateRoute';
import NavBar from '../NavBar/NavBar';

function App() {
  return (
    <Router>
        <Container fluid>
          
        <NavBar />  
          
          
          
          <Route exact path='/' component={RecipeList} />
          
        </Container>
      </Router>
  );
}

export default App;
