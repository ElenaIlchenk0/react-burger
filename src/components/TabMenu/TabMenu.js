import React from 'react';
import tabMenuStyles from './TabMenu.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'


const TabMenu = () => {
    const [current, setCurrent] = React.useState('buns');


    return (
        <div style={{ display: 'flex' }} className='pt-5 pb-10'>
            <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    )

}


export default TabMenu;