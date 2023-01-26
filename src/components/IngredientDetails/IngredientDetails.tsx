import React, { useEffect, useState } from "react";
import ingredientDetailsStyles from './IngredientDetails.module.css';
import { useSelector } from '../../utils/types/reduxTypes';
import { useParams } from 'react-router-dom';
import { TIngredientData } from '../../utils/types/types'

const IngredientDetails = () => {
    const { ingredients, isError } = useSelector(store => store.ingredientsReducer);
    const { ingredientId } = useParams<{ ingredientId?: string }>();

    const [ingredient, setIngredient] = useState<TIngredientData>()

    useEffect(() => {
        if (!isError && ingredients.length > 0) {
            const ingredientInfo = ingredients.find((ing) => ing._id === ingredientId);
            setIngredient(ingredientInfo)
        }
    }, [ingredients, isError, ingredientId])

    return (
        <div className={ingredientDetailsStyles.container}>
            <h1 className={ingredientDetailsStyles.header}>Детали ингредиента</h1>
            {
                ingredient && (
                    <>
                        <img className='pb-4' src={ingredient.image_large} alt='Ingredient'></img>
                        <p className="text text_type_main-medium" data-testid='ingredientTitle'>{ingredient.name}</p>
                        <div className={ingredientDetailsStyles.calories}>
                            <div><p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                                <p className="text text_type_digits-default text_color_inactive pt-2">
                                    {ingredient.calories}
                                </p>
                            </div>
                            <div><p className="text text_type_main-default text_color_inactive">Белки, г</p>
                                <p className="text text_type_digits-default text_color_inactive pt-2">
                                    {ingredient.proteins}
                                </p>
                            </div>
                            <div><p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                                <p className="text text_type_digits-default text_color_inactive pt-2">
                                    {ingredient.fat}
                                </p>
                            </div>
                            <div><p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                                <p className="text text_type_digits-default text_color_inactive pt-2">
                                    {ingredient.carbohydrates}
                                </p>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}


export default IngredientDetails;
