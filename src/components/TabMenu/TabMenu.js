import React from 'react';
import tabMenuStyles from './TabMenu.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'


const TabMenu = (props) => {
    const [current, setCurrent] = React.useState('buns');

    const onClickHandler = (value) => {
        props.onClickTab(value);
        setCurrent(value)
    }


    return (
        <div style={{ display: 'flex' }} className='pt-5 pb-10'>
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


export default TabMenu;