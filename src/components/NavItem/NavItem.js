import React from 'react';
import navItemStyles from './NavItem.module.css';
import PropTypes from 'prop-types';

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

NavItem.propTypes = {
    id: PropTypes.number,
    icon: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired
}

export default NavItem;