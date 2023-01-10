export const countIngredients = (idArr: string[]) => {
    let countIngredients: { [key: string]: number } = {};

    idArr.forEach((ing) => {
        countIngredients[ing] = countIngredients[ing] + 1 || 1;
    });

    return countIngredients;
}
