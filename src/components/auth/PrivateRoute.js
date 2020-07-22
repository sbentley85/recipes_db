import React from 'react';
import { Route } from 'react-router-dom';
import { useAuth0 } from '../../contexts/auth0-context';





const PrivateRoute = ({component: Component, ...rest}) => {
    const {isLoading, isAuthenticated, loginWithRedirect} = useAuth0();
    const baseUri = (process.env.NODE_ENV === 'production') ? 'https://ancient-forest-86382.herokuapp.com' : 'http://localhost:3000'
       

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