import H from "history";

export type TModalState = {
    background: H.Location
}

export type TIngredientType = 'bun' | 'otherIngredients';

export type TIngredientData = {
    _id: string,
    type: TIngredientType,
    name: string,
    price: number,
    image: string,
}
