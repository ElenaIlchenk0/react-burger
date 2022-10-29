import React from 'react';
import mainLogoStyles from './MainLogo.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

class MainLogo extends React.Component {
    render() {
        return (
            <div className={mainLogoStyles.mainLogo}>
                <Logo />
            </div>
        )
    }
}

export default MainLogo;