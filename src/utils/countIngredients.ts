export const countIngredients = (arr: string[]) => {
    let countIngredients: { [key: string]: number } = {};

    arr.forEach((ing) => {
        countIngredients[ing] = countIngredients[ing] + 1 || 1;
    });

    return countIngredients;
}
