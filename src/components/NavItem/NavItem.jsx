import React from 'react';
import navItemStyles from './NavItem.module.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavItem = (props) => {
    let link = '';
    switch (props.title) {
        case 'Конструктор':
            link = '/'
            break;

        case 'Лента заказов':
            link = '/'
            break;

        case 'Личный кабинет':
            link = '/profile'
            break;

        default:
            link = '/'
            break;
    }

    return (
        <div className={`${props.isActive ? navItemStyles.active : navItemStyles.inactive} ${navItemStyles.item} pt-4 pb-4 pr-5 pl-5`}>
            <Link to={link} className={navItemStyles.link}>
                {props.icon}
                <div>{props.title}</div>
            </Link>
        </div>
    )

}

NavItem.propTypes = {
    isActive: PropTypes.bool,
    icon: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
}

export default NavItem;
