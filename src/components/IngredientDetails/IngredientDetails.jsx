import React from "react";
import ingredientDetailsStyles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';
import { burgerDataPropTypes } from '../../prop-types';

const IngredientDetails = (props) => {
    return (
        <div className={ingredientDetailsStyles.container}>
            <img className='pb-4' src={props.ingredient.image_large} alt='Ingredient'></img>
            <p className="text text_type_main-medium">{props.ingredient.name}</p>
            <div className={ingredientDetailsStyles.calories}>
                <div><p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                    <p className="text text_type_digits-default text_color_inactive pt-2">
                        {props.ingredient.calories}</p>
                </div>
                <div><p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive pt-2">
                        {props.ingredient.proteins}</p>
                </div>
                <div><p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive pt-2">
                        {props.ingredient.fat}</p>
                </div>
                <div><p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive pt-2">
                        {props.ingredient.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    ingredient: PropTypes.shape(burgerDataPropTypes).isRequired,
};

export default IngredientDetails;