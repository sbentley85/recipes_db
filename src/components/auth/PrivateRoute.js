import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '../../contexts/auth0-context';





const PrivateRoute = ({component: Component, ...rest}) => {
    const {isLoading, isAuthenticated, loginWithRedirect} = useAuth0();
    const baseUri = 'https://serene-earth-35787.herokuapp.com';
       

    if (isLoading) {
        return null
    } else {

        return (
            <Route {...rest} render={props => (
                isAuthenticated ? 
                <Component {...props} />
                : loginWithRedirect({
                    redirect_uri: baseUri + props.location.pathname
                    
                })

            )} />
        
        )
    }
};

export default PrivateRoute