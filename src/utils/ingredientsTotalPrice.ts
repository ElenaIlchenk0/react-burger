import { TIngredientData } from './types/types';
import { countIngredients } from './countIngredients'

export const ingredientsTotalPrice = (idArr: string[], ingArr: TIngredientData[]) => {
    let totalPrice = 0;

    let countIng = countIngredients(idArr);

    ingArr.forEach((ing) => {
        totalPrice = totalPrice + countIng[ing._id] * ing.price
    })
    return totalPrice;
}
