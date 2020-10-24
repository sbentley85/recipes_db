import React from 'react';
import { shallow, mount } from "enzyme";
import App from '../components/App/App';
import RecipeList from '../components/RecipeList/RecipeList';
import RecipeDetails from '../components/RecipeDetails/RecipeDetails';

import FilterResults from 'react-filter-search';
import { Auth0Provider } from "../contexts/auth0-context";

import { MemoryRouter, Route } from 'react-router-dom';
import { render } from "@testing-library/react";

// import RecipeList from '../components/RecipeList/RecipeList'
// import Container from 'react-bootstrap/Container';


describe("Rendering Components", () => {
  it("Renders App component without crashing", () => {
    shallow(<App />);
  });

  it("Renders RecipeList component without crashing", () => {
    shallow(<RecipeList />);
  });

  
});


describe('Routes', () => {
  let pathMap = {};

  beforeAll(() => {
    const component = shallow(<App/>);

    pathMap = component.find(Route).reduce((pathMap, route) => {
        const routeProps = route.props();
        pathMap[routeProps.path] = routeProps.component;
        return pathMap;
      }, {});

  })

  it('Should render Recipe List for home route', () => {
    expect(pathMap['/']).toBe(RecipeList);

  });

  it('Should render RecipeDetails for individual recipe route', () => {
    expect(pathMap['/recipes/:id']).toBe(RecipeDetails);

  });

});





describe('Passing props', ()=> {
  const recipes = [
    {
      name: 'Tacos'
    },
    {
      name: 'Burgers'
    }
  ]

  const listWrapper = shallow(
    <MemoryRouter initialEntries={['/']}>
      <RecipeList recipes={recipes}/>
    </MemoryRouter>
  )

  const filterWrapper = mount(
    <FilterResults
      data={recipes}
      value=""
      renderResults={results => (                
        <h1>Just testing</h1>
    )}/>
  )

  it('RecipeList accepts recipe props', ()=> {
    expect(listWrapper.props().children.props.recipes).toEqual(recipes)
  });

  it('FilterResults accepts recipes props', () => {
    expect(filterWrapper.props().data).toEqual(recipes);

  })
})



