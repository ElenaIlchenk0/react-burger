import React from 'react';
import layoutStyles from './Layout.module.css';
import AppHeader from '../AppHeader/AppHeader'

const Layout = (props) => {
    return (
        <div className={`${layoutStyles.wrapper} text_type_main-default`}>
            <AppHeader />
            <div className={layoutStyles.content}>
                {props.children}
            </div>
        </div>
    )
}

export default Layout;