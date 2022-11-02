import React from 'react';
import navItemStyles from './NavItem.module.css';
import PropTypes from 'prop-types';

class NavItem extends React.Component {

    

    render() {
        return (
            <div className={`${this.props.isActive ? navItemStyles.active : navItemStyles.inactive} ${navItemStyles.item} pt-4 pb-4 pr-5 pl-5`}>
                <a href="#" className={navItemStyles.link}>
                    {this.props.icon}
                    <div>{this.props.title}</div>
                </a>
            </div>
        )
    }

}

NavItem.propTypes = {
    isActive: PropTypes.bool.isRequired,
    id: PropTypes.number,
    icon: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
}

export default NavItem;