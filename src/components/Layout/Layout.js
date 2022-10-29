import React from 'react';
import layoutStyles from './Layout.module.css';
import AppHeader from '../AppHeader/AppHeader'

class Layout extends React.Component {
    render() {
        return (
            <div className={`${layoutStyles.wrapper} text_type_main-default`}>
                <AppHeader
                    activeNavItemId={this.props.activeNavItemId}
                    onActiveNavItemId={this.props.onActiveNavItemId} />
                <div className={layoutStyles.content}>
                    {this.props.children}
                </div>
            </div>
        )
    }

}

export default Layout;