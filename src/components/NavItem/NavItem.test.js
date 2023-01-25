import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import NavItem from './NavItem';
import { BurgerIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BrowserRouter } from 'react-router-dom';


const navItemProps = {
    isActive: true,
    icon: <ProfileIcon type="primary" />,
    title: 'Личный кабинет'
}

describe('NavItem in AppHeader', () => {

    it('renders without errors', () => {
        const tree = renderer
            .create(
                <BrowserRouter>
                    <NavItem {...navItemProps} />
                </BrowserRouter>
                )
        expect(tree).toMatchSnapshot();
    }); 

    it('should has correct title', () => {
        render(
            <BrowserRouter>
                <NavItem {...navItemProps} />
            </BrowserRouter>
        );
        expect(screen.getByTestId('title')).toHaveTextContent('Личный кабинет');
    }); 

    it('should has correct link', () => {
        render(
            <BrowserRouter>
                <NavItem {...navItemProps} />
            </BrowserRouter>
        );
        expect(screen.getByTestId('link')).toHaveAttribute('href', '/profile')
    }); 
    
    it('should receive class "active" when "isActive: true" and not receive "inactive"', () => {
        render(
            <BrowserRouter>
                <NavItem {...navItemProps} />
            </BrowserRouter>
        );
        const wrapper = screen.getByTestId('wrapper')

        expect(wrapper.classList.contains('active')).toBe(true);
        expect(wrapper.classList.contains('inactive')).not.toBe(true);
    });

    it('should receive class "inactive" when "isActive: false" and not receive "active"', () => {
        const navItemProps = {
            isActive: false,
            icon: <BurgerIcon type="primary" />,
            title: 'Конструктор'
        }

        render(
            <BrowserRouter>
                <NavItem {...navItemProps} />
            </BrowserRouter>
        );
        const wrapper = screen.getByTestId('wrapper')

        expect(wrapper).toHaveClass('inactive');
        expect(wrapper).not.toHaveClass('active');;
    });

})
