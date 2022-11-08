import React from 'react';
import navItemStyles from './NavItem.module.css';
import PropTypes from 'prop-types';

const NavItem = (props) => {

    return (
        <div className={`${props.isActive ? navItemStyles.active : navItemStyles.inactive} ${navItemStyles.item} pt-4 pb-4 pr-5 pl-5`}>
            <a href="#" className={navItemStyles.link}>
                {props.icon}
                <div>{props.title}</div>
            </a>
        </div>
    )
    
}

NavItem.propTypes = {
    isActive: PropTypes.bool,
    icon: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
}

export default NavItem;