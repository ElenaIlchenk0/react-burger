import React from 'react';
import ingredientItemStyles from './IngredientItem.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const IngredientItem = (props) => {

    const handleClickIngredient = () => {
        props.onOpenModal(props.burgerData._id)
    }

    return (
        <div onClick={handleClickIngredient} className={`${ingredientItemStyles.ingredientsInner} pt-6 pr-4 pl-4 pb-10`}>
            <div className={ingredientItemStyles.ingredientsItem}>
                <div className={ingredientItemStyles.image}>
                    <img src={props.burgerData.image} alt='ingredient img' />
                </div>
                <div className={`${ingredientItemStyles.price}`}>
                    <p className={'text text_type_digits-default'}>{props.burgerData.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={ingredientItemStyles.title}>{props.burgerData.name}</p>
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