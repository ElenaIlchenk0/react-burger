import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../../../services/actions/userInfo'

const Logout = (props) => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(store => store.setUserReducer)
    const history = useHistory();

    useEffect(() => {
        dispatch(logoutUser());
    }, [dispatch])

    useEffect(() => {
        if (!isAuthenticated) history.push("/login")
    }, [isAuthenticated, history])

    return (
        <></>
    );
}

export default Logout;
