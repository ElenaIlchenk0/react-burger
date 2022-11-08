import React from 'react';
import ingredientsCategoryStyles from './IngredientsCategory.module.css';
import IngredientItem from '../IngredientItem/IngredientItem';

const IngredientsCategory = (props) => {
    return (
        <div className={ingredientsCategoryStyles.ingredients}>
            <h2 ref={props.refItem}>{props.category}</h2>
            {
                props.data.map((item) =>
                    <IngredientItem
                        burgerData={item}
                        key={item._id}
                        onOpenModal={props.onOpenModal} />)
            }
        </div>
    )
}

export default IngredientsCategory
