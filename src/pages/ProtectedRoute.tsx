import React from 'react';
import { useSelector } from '../utils/types/reduxTypes';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { THistoryFrom } from '../utils/types/types';

const ProtectedRoute = ({ onlyUnAuth = false, ...rest }) => {
    const { authChecked, user } = useSelector(store => store.setUserReducer);
    const location = useLocation<THistoryFrom>();

    if (!authChecked) {
        return null;
    }

    if (onlyUnAuth && user) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Redirect to={from} />;
    }

    if (!onlyUnAuth && !user) {
        return (
            <Redirect
                to={{
                    pathname: "/login",
                    state: { from: location }
                }} />
        )
    }

    // !onlyUnAuth && user
    return (
        <Route {...rest} />
    );
}

export default ProtectedRoute;
