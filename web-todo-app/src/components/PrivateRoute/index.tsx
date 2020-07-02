import React from 'react';

import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {RootState} from '../../reducers/root.reducer'; 

const PrivateRoute: React.FC = ({ children, ...rest}) => {

    const auth = useSelector((state: RootState) => state.auth);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.loggedIn ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

export default PrivateRoute;