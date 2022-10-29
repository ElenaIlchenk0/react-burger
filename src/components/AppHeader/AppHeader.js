import React from 'react';
import appHeaderStyles from './AppHeader.module.css';
import Nav from '../Nav/Nav';
import NavItem from '../NavItem/NavItem';
import MainLogo from '../MainLogo/MainLogo';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';


class AppHeader extends React.Component {
    render() {
        return (
            <header className={`${appHeaderStyles.header} p-4`}>
                <div className={appHeaderStyles.headerInner}>
                    <Nav activeNavItemId={this.props.activeNavItemId} 
                        onActiveNavItemId={this.props.onActiveNavItemId}
                        items={[{ icon: (<BurgerIcon type="primary" />), title: 'Конструктор' },
                            { icon: (<ListIcon type="primary" />), title: 'Лента заказов' }]} />

                    <MainLogo />
                    <NavItem icon={<ProfileIcon type="primary" />} title={'Личный кабинет'} />
                </div>
            </header>
        )
    }

}

export default AppHeader;