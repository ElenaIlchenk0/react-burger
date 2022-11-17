import React, { useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import tabMenuStyles from './TabMenu.module.css'
import PropTypes from 'prop-types';


const TabMenu = (props) => {
    const [current, setCurrent] = React.useState();

    useEffect(() => {
        if (props.currentIndexTab) setCurrent(0)
    }, [props.currentIndexTab])

    const onClickHandler = (value) => {
        props.onClickTab(value);
        setCurrent(value)
    }

    return (
        <div ref={props.tabRef} className={`${tabMenuStyles.tabMenu} pt-5 pb-10`}>
            <Tab value="buns" active={current === 'buns' || props.currentIndexTab === 0} onClick={onClickHandler}>
                Булки
            </Tab>
            <Tab value="sauces" active={current === 'sauces' || props.currentIndexTab === 1} onClick={onClickHandler}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main' || props.currentIndexTab === 2} onClick={onClickHandler}>
                Начинки
            </Tab>
        </div>
    )

}

TabMenu.propTypes = {
    onClickTab: PropTypes.func.isRequired
}


export default TabMenu;
