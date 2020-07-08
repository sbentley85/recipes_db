import React from 'react';
import RecipeList from '../RecipeList/RecipeList';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import './App.css';

function App() {
  return (
    <Router>
        <Container fluid>
          
          
          
          
          
          <Route exact path='/' component={RecipeList} />
          
        </Container>
      </Router>
  );
}

export default App;
