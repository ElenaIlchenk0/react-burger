import React from 'react';
import navStyles from './Nav.module.css';
import NavItem from '../NavItem/NavItem';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'

class Nav extends React.Component {
    render() {
        return (
            <nav className={navStyles.nav}>
                {
                    this.props.items.map((e, i) => (
                    <NavItem 
                        id={i} 
                        title={e.title} 
                        icon={e.icon} 
                        isActive={i === this.props.activeNavItemId}
                        onActiveNavItemId={this.props.onActiveNavItemId}
                    />))
                }
            </nav>
        )
    }

}

export default Nav;