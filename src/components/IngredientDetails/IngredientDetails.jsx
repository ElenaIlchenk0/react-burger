import React, { useEffect, useState } from "react";
import ingredientDetailsStyles from './IngredientDetails.module.css';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom'

const IngredientDetails = (props) => {
    const { ingredients, isError } = useSelector(store => store.ingredientsReducer);
    const { ingredientId } = useParams();

    const [ingredient, setIngredient] = useState()

    useEffect(() => {
        if (!isError && ingredients.length > 0) {
            const ingredientInfo = ingredients.find((ing) => ing._id === ingredientId);
            setIngredient(ingredientInfo)
        }
        
    }, [ingredients])
 
    return (
        <div className={ingredientDetailsStyles.container}>
            <h1 className={ingredientDetailsStyles.header}>Детали ингредиента</h1>
            {
                ingredient && (
                    <>
                        <img className='pb-4' src={ingredient.image_large} alt='Ingredient'></img>
                        <p className="text text_type_main-medium">{ingredient.name}</p>
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
