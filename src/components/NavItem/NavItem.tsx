import React, { ReactElement } from 'react';
import navItemStyles from './NavItem.module.css';
import { Link } from 'react-router-dom';

interface INavItem {
    isActive: boolean,
    title: string,
    icon: ReactElement,
}

const NavItem: React.FC<INavItem> = ({ isActive, title, icon }) => {
    let link = '';
    switch (title) {
        case 'Конструктор':
            link = '/'
            break;

        case 'Лента заказов':
            link = '/feed'
            break;

        case 'Личный кабинет':
            link = '/profile'
            break;

        default:
            link = '/'
            break;
    }
    
    return (
        <div 
            className={`${isActive ? navItemStyles.active : navItemStyles.inactive} ${navItemStyles.item} pt-4 pb-4 pr-5 pl-5`}
            data-testid="wrapper"
            >
            <Link data-testid='link' to={link} className={navItemStyles.link}>
                {icon}
                <div data-testid='title'>{title}</div>
            </Link>
        </div>
    )
}

export default NavItem;
