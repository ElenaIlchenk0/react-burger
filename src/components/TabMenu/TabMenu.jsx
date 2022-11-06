import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import tabMenuStyles from './TabMenu.module.css'
import PropTypes from 'prop-types';


const TabMenu = (props) => {
    const [current, setCurrent] = React.useState('buns');

    const onClickHandler = (value) => {
        props.onClickTab(value);
        setCurrent(value)
    }

    return (
        <div className={`${tabMenuStyles.tabMenu} pt-5 pb-10`}>
            <Tab value="buns" active={current === 'buns'} onClick={onClickHandler}>
                Булки
            </Tab>
            <Tab value="sauces" active={current === 'sauces'} onClick={onClickHandler}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={onClickHandler}>
                Начинки
            </Tab>
        </div>
    )

}

TabMenu.propTypes = {
    onClickTab: PropTypes.func.isRequired
}


export default TabMenu;