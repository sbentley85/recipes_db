import React from 'react';
import { useAuth0 } from '../../contexts/auth0-context';

import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';


function NavBar () {
    const {loginWithRedirect, isLoading, user, logout} = useAuth0();
    

    
    return (
        <Navbar fixed='top' bg="light" >
            
            <Navbar.Brand href="/">
                
                <div className='logo'></div>
            </Navbar.Brand>
            
            
                <Nav className="mr-auto">
                
                
                
                </Nav>
                <Nav className="ml-auto">
                {!isLoading && !user && (
                    
                    <Button variant="primary" onClick={loginWithRedirect}>Login</Button>    
                )}
                {user && !isLoading && (
                    <NavDropdown title="My Account" id="basic-nav-dropdown">
                    <NavDropdown.Item href='/myRecipes'>My Recipes</NavDropdown.Item>
                    <NavDropdown.Item href='/myFavorites'>My Favorites</NavDropdown.Item>
                    <NavDropdown.Item href="/recipe/new">New Recipe</NavDropdown.Item>
                    
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => logout({returnTo: window.location.origin})}>Sign Out</NavDropdown.Item>    
                    </NavDropdown>
                    
                )}
                </Nav>
            
        </Navbar>
    );
    
}

export default NavBar;