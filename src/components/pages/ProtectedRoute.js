import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../services/actions/userInfo';
import { Route, Redirect, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ onlyUnAuth = false, ...rest }) => {
    const dispatch = useDispatch();
    const { isAuthenticated, authChecked } = useSelector(store => store.setUserReducer);
    const location = useLocation();

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    if (!authChecked) {
        return null;
    }

    if (onlyUnAuth && isAuthenticated) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Redirect to={from} />;
    }

    if (!onlyUnAuth && !isAuthenticated) {
        return (
            <Redirect
                to={{
                    pathname: "/login",
                    state: { from: location }
                }} />
        )
    }

    // !onlyUnAuth && isAuthenticated
    return (
        <Route {...rest} />
    );
}

export default ProtectedRoute;
