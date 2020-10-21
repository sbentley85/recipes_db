import React from 'react';
import { shallow } from "enzyme";
import App from '../components/App/App';
// import RecipeList from '../components/RecipeList/RecipeList'
// import Container from 'react-bootstrap/Container';


describe("Rendering Components", () => {
  it("Renders App component without crashing", () => {
    shallow(<App />);
  });

  // it("Renders App container without crashing", () => {
  //   const wrapper = shallow(<App />);
  //   const container = (<Container fluid />)
  // })
});



