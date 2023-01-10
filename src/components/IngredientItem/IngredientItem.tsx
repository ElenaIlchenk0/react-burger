import React, { useState, useEffect } from 'react';
import ingredientItemStyles from './IngredientItem.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { Link, useLocation } from 'react-router-dom';
import { TModalState, TIngredientData } from '../../utils/types/types';
import { useSelector } from '../../utils/types/reduxTypes';

interface IProps {
    burgerData: TIngredientData
}

const IngredientItem: React.FC<IProps> = ({ burgerData }) => {
    const { bun, otherIngredients } = useSelector(store => store.constructorIngReducer.constructor);
    const [counter, setCounter] = useState(0);

    const ingredientId = burgerData._id;

    const location = useLocation();

    useEffect(() => {
        if (burgerData.type === 'bun') {
            burgerData._id === bun?._id ? setCounter(1) : setCounter(0)
        } else {
            let countIng: number = otherIngredients.filter((item: TIngredientData) => item._id === ingredientId).length
            setCounter(countIng)
        }
    }, [bun, otherIngredients, burgerData])

    const [{ opacity }, dragRef] = useDrag({
        type: 'ingredient',
        item: { item: burgerData },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
            isDragging: !!monitor.isDragging(),
        })
    })

    return (
        <Link<TModalState>
            key={ingredientId}
            to={{
                pathname: `/ingredients/${ingredientId}`,
                state: { background: location },
            }}
            className={ingredientItemStyles.link}
        >
            <div ref={dragRef}
                style={{ opacity }}
                className={`${ingredientItemStyles.ingredientsInner} pt-6 pr-4 pl-4 pb-10`
                }>
                <div
                    style={{ display: counter > 0 ? 'flex' : 'none' }}
                    className={`${ingredientItemStyles.counter} text text_type_digits-default`}
                >
                    {counter}
                </div>
                <div className={ingredientItemStyles.ingredientsItem}>
                    <div className={ingredientItemStyles.image}>
                        <img src={burgerData.image} alt='ingredient img' />
                    </div>
                    <div className={`${ingredientItemStyles.price}`}>
                        <p className={'text text_type_digits-default'}>{burgerData.price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <p className={ingredientItemStyles.title}>{burgerData.name}</p>
                </div>
            </div>
        </Link>
    )
}

export default IngredientItem;
