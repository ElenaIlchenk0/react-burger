import React, { useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import tabMenuStyles from './TabMenu.module.css';

interface ITabMenu {
    currentIndexTab: number,
    onClickTab: (v: string) => void,
    tabRef: React.RefObject<HTMLDivElement>,
}

const TabMenu: React.FC<ITabMenu> = ({ currentIndexTab, onClickTab, tabRef }) => {
    const [current, setCurrent] = React.useState<string>();

    useEffect(() => {
        if (currentIndexTab) setCurrent('')
    }, [currentIndexTab])

    const onClickHandler = (value: string):void => {
        onClickTab(value);
        setCurrent(value);
    }

    return (
        <div ref={tabRef} className={`${tabMenuStyles.tabMenu} pt-5 pb-10`}>
            <Tab value="buns" active={current === 'buns' || currentIndexTab === 0} onClick={onClickHandler}>
                Булки
            </Tab>
            <Tab value="sauces" active={current === 'sauces' || currentIndexTab === 1} onClick={onClickHandler}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main' || currentIndexTab === 2} onClick={onClickHandler}>
                Начинки
            </Tab>
        </div>
    )
}

export default TabMenu;
