import React from 'react';

import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../../reducers/root.reducer';

interface Props extends RouteProps{
    path : string
}

const PrivateRoute: React.FC<Props> = ({ children, path }) => {

    const auth = useSelector((state: RootState) => state.auth);

    return (
        <Route
            path={path}
            render={({ location }) =>
                auth.loggedIn ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

export default PrivateRoute;