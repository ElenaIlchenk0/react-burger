import React from 'react';
import navItemStyles from './NavItem.module.css';

class NavItem extends React.Component {

    render() {
        return (
            <div onClick={() => this.props.onActiveNavItemId(this.props.id)}
                className={`${this.props.isActive ? navItemStyles.active : navItemStyles.inactive} ${navItemStyles.item} pt-4 pb-4 pr-5 pl-5`}>
                {this.props.icon}
                <div>{this.props.title}</div>
            </div>

        )
    }

}

export default NavItem;