import React, { useState, useEffect } from 'react';
import ingredientItemStyles from './IngredientItem.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux';

const IngredientItem = ({ burgerData, onOpenModal }) => {
    const { bun, otherIngredients } = useSelector(store => store.constructorIngReducer.constructor);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        if (burgerData.type === 'bun') {
            burgerData._id === bun._id ? setCounter(1) : setCounter(0)
        } else {
            let countIng = otherIngredients.filter(item => item._id === burgerData._id).length
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
    });

    const handleClickIngredient = () => {
        onOpenModal(burgerData._id)
    }

    return (
        
        <div ref={dragRef}
            style={{ opacity }}
            onClick={handleClickIngredient}
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
        

    )
}

IngredientItem.propTypes = {
    burgerData: PropTypes.shape({
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};

export default IngredientItem;
