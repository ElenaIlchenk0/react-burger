import React, { useState, useRef, useMemo, useEffect } from 'react';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import TabMenu from '../TabMenu/TabMenu';
import IngredientsCategory from '../IngredientsCategory/IngredientsCategory';
import { useSelector } from 'react-redux';


const BurgerIngredients = () => {
    const { ingredients, isError } = useSelector(store => store.ingredientsReducer);

    const [startScroll, setStartScroll] = useState()

    useEffect(() => {
        if (tabRef) {
            setStartScroll(tabRef.current.getBoundingClientRect().bottom);
        }
    }, [startScroll])

    const tabRef = useRef();

    const refBuns = useRef();
    const refSauces = useRef();
    const refMain = useRef();

    const [currentIndexTab, setCurrentIndexTab] = useState(0);

    const buns = useMemo(() => ingredients.filter((data) => data.type === 'bun'), [ingredients]);
    const sauces = useMemo(() => ingredients.filter((data) => data.type === 'sauce'), [ingredients]);
    const main = useMemo(() => ingredients.filter((data) => data.type === 'main'), [ingredients]);

    const dataCategories = [
        {
            data: buns,
            refItem: refBuns,
            name: 'Булки'
        },
        {
            data: sauces,
            refItem: refSauces,
            name: 'Соусы'
        },
        {
            data: main,
            refItem: refMain,
            name: 'Начинки'
        }
    ]

    const handleClickTab = (value) => {
        switch (value) {
            case 'buns': refBuns.current.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'sauces': refSauces.current.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'main': refMain.current.scrollIntoView({ behavior: 'smooth' });
                break;
            // no default
        }
    }

    const handleScroll = () => {
        const buns = Math.abs(startScroll - refBuns.current.getBoundingClientRect().top)
        const sauces = Math.abs(startScroll - refSauces.current.getBoundingClientRect().top)
        const main = Math.abs(startScroll - refMain.current.getBoundingClientRect().top)

        const arr = [buns, sauces, main];

        const activeTab = Math.min(...arr);
        const index = arr.findIndex((el) => el === activeTab);
        setCurrentIndexTab(index);
    }

    return (
        <div className={`${burgerIngredientsStyles.wrapper} pt-10`}>
            <h1>Соберите бургер</h1>
            <TabMenu tabRef={tabRef} onClickTab={handleClickTab} currentIndexTab={currentIndexTab}/>
            {
                !isError && ingredients.length > 0 && (
                    <div onScroll={handleScroll} className={burgerIngredientsStyles.ingredientsContainer}>
                        {
                            dataCategories.map((category, index) =>
                                <IngredientsCategory
                                    category={category.name}
                                    data={category.data}
                                    refItem={category.refItem}
                                    key={index}
                                />
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default BurgerIngredients;
