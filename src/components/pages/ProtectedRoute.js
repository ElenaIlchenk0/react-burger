import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHECK_USER, getUser } from '../../services/actions/userInfo';
import { Route, Redirect, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ onlyUnAuth = false, ...rest }) => {
    const dispatch = useDispatch();
    const { authChecked, user } = useSelector(store => store.setUserReducer);
    const location = useLocation();

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            dispatch(getUser()).finally(() => dispatch({ type: CHECK_USER }))
        } else {
            dispatch({ type: CHECK_USER })
        }
    }, [authChecked])

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

    // !onlyUnAuth && isAuthenticated
    return (
        <Route {...rest} />
    );
}

export default ProtectedRoute;
