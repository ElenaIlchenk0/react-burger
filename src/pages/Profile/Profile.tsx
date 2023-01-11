import React, { useEffect } from 'react';
import profileStyles from './Profile.module.css';
import { useDispatch, useSelector } from '../../utils/types/reduxTypes';
import { logoutUser } from '../../services/actions/userInfo';
import { Switch, Route, NavLink } from 'react-router-dom';
import ProfileForm from '../ProfileForm/ProfileForm';
import OrdersFeed from '../../components/OrdersFeed/OrdersFeed';
import { WebSocketStatus } from '../../utils/types/types';
import { connect, disconnect } from '../../services/actions/userOrders';
import { ALL_ORDERS_FEED_URL } from '../../utils/constants';

const Profile = () => {
    const dispatch = useDispatch();
    const { orders, status } = useSelector(state => state.wsUserReducer);
    const isDisconnected = status === WebSocketStatus.OFFLINE;

    useEffect(() => () => { dispatch(disconnect()) }, [])

    useEffect(() => {
        if (isDisconnected) {
            const token = localStorage.getItem('accessToken');
            dispatch(connect(`${ALL_ORDERS_FEED_URL}?token=${token}`))
        }
    }, [dispatch, isDisconnected])



    const logoutHandler = () => {
        dispatch(logoutUser())
    };

    return (
        <div className={profileStyles.profileWrapper}>
            <div className={profileStyles.sideMenu}>
                <nav className={profileStyles.nav}>
                    <NavLink
                        to='/profile'
                        exact
                        className='text text_type_main-medium text_color_inactive'
                        activeClassName={profileStyles.activeNav}
                    >
                        Профиль
                    </NavLink>
                    <NavLink
                        to='/profile/orders'
                        exact
                        className='text text_type_main-medium text_color_inactive'
                        activeClassName={profileStyles.activeNav}
                    >
                        История заказов
                    </NavLink>
                    <div
                        className={`${profileStyles.navButton} text text_type_main-medium text_color_inactive`}
                        style={{ cursor: "pointer", height: "64px" }}
                        onClick={logoutHandler}
                    >
                        <span>Выход</span>
                    </div>
                </nav>
                <p className='text text_type_main-default text_color_inactive'>
                    В этом разделе вы можете
                    изменить свои персональные данные
                </p>
            </div>
            <Switch>
                <Route path='/profile' exact>
                    <ProfileForm />
                </Route>
                <Route path='/profile/orders' exact>
                    <OrdersFeed orders={orders}/>
                </Route>
            </Switch>
        </div>
    )
}

export default Profile;
