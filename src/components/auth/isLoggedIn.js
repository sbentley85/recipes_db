import React from 'react';
import { useAuth0 } from '../../contexts/auth0-context';


const isLoggedIn = () => {
    
    const {isAuthenticated} = useAuth0();
    if(isAuthenticated) {
        console.log('User is logged in');
        return true;
    } else {
        console.log('User is not logged in');
        return false;
  }
};

export default isLoggedIn