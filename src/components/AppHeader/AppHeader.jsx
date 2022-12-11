import React from 'react';
import appHeaderStyles from './AppHeader.module.css';
import NavItem from '../NavItem/NavItem';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';

const AppHeader = (props) => {
    const location = useLocation();
    const isProfile = useRouteMatch('/profile');

    return (
        <header className={`${appHeaderStyles.header} pt-4 pb-4`}>
            <div className={appHeaderStyles.headerInner}>
                <div className={appHeaderStyles.nav}>
                    <NavItem 
                        isActive={location.pathname === '/'} 
                        icon={<BurgerIcon type="primary" />} 
                        title='Конструктор' 
                    />
                    <NavItem 
                        icon={<ListIcon type="primary" />} 
                        title='Лента заказов' 
                    />
                </div>
                <div className={appHeaderStyles.mainLogo}>
                    <Link to='/'>
                        <Logo />
                    </Link>
                </div>
                <NavItem 
                    isActive={!!isProfile} 
                    icon={<ProfileIcon type="primary" />} 
                    title='Личный кабинет' 
                />
            </div>
        </header>
    )
}

export default AppHeader;
