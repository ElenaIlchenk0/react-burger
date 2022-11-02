import React from 'react';
import appHeaderStyles from './AppHeader.module.css';
import NavItem from '../NavItem/NavItem';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

class AppHeader extends React.Component {
    render() {
        return (
            <header className={`${appHeaderStyles.header} p-4`}>
                <div className={appHeaderStyles.headerInner}>
                    <div className={appHeaderStyles.nav}>
                        <NavItem isActive={true} icon={<BurgerIcon type="primary" />} title={'Конструктор'} />
                        <NavItem isActive={false} icon={<ListIcon type="primary" />} title={'Лента заказов'} />
                    </div>
                    <div className={appHeaderStyles.mainLogo}>
                        <Logo />
                    </div>
                    <NavItem isActive={false} icon={<ProfileIcon type="primary" />} title={'Личный кабинет'} />
                </div>
            </header>
        )
    }

}

export default AppHeader;