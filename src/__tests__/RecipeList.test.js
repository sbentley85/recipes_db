import React from 'react';
import { shallow, mount } from "enzyme";
import FilterResults from 'react-filter-search';
import RecipeList from '../components/RecipeList/RecipeList';

describe("Rendering", () => {
    it("Renders RecipeList component without crashing", () => {
        shallow(<RecipeList />);
      });
});

// describe("Passing props", () => {
//     const listWrapper = mount(<RecipeList />);
//     const filterWrapper = mount(<FilterResults />)
// })