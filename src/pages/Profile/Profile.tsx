import React from 'react';
import profileStyles from './Profile.module.css';
import { useDispatch } from '../../utils/types/reduxTypes';
import { logoutUser } from '../../services/actions/userInfo';
import { Switch, Route, NavLink } from 'react-router-dom';
import ProfileForm from '../ProfileForm/ProfileForm';
import OrderFeedWrapper from '../../components/OrderFeedWrapper/OrderFeedWrapper';

const Profile = () => {
    const dispatch = useDispatch();

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
                    <OrderFeedWrapper />
                </Route>
            </Switch>
        </div>
    )
}

export default Profile;
