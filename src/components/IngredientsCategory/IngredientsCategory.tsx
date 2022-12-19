import React from 'react';
import ingredientsCategoryStyles from './IngredientsCategory.module.css';
import IngredientItem from '../IngredientItem/IngredientItem';
import { TIngredientData } from '../../types/types';

interface IIngredientsCategory {
    data: Array<TIngredientData>,
    category: string,
    refItem: React.RefObject<HTMLHeadingElement>,
}

const IngredientsCategory: React.FC<IIngredientsCategory> = ({ data, category, refItem }) => {
    return (
        <div className={ingredientsCategoryStyles.ingredients}>
            <h2 ref={refItem}>{category}</h2>
            {
                data.map((item) =>
                    <IngredientItem
                        burgerData={item}
                        key={item._id}
                />)
            }
        </div>
    )
}

export default IngredientsCategory
