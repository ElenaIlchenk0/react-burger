import React, { ReactElement } from 'react';
import layoutStyles from './Layout.module.css';
import AppHeader from '../AppHeader/AppHeader'

interface ILayout {
    children: ReactElement | ReactElement[];
}

const Layout: React.FC<ILayout> = ({ children }) => {
    return (
        <div className={`${layoutStyles.wrapper} text_type_main-default`}>
            <AppHeader />
            <div className={layoutStyles.content}>
                {children}
            </div>
        </div>
    )
}

export default Layout;
