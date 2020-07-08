import React from 'react';
import RecipeList from '../RecipeList/RecipeList';

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
