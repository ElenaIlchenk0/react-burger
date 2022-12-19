import H from "history";

export type TModalState = {
    background: H.Location;
}

export type THistoryFrom = {
    from: string;
}

export type TIngredientType = 'bun' | 'otherIngredients';

export type TIngredientData = {
    _id: string,
    name: string,
    type: TIngredientType | 'sauce' | 'main',
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number
}
export type TRes = {
    "success": boolean,
    "message"?: string,
}

export type TTokenRes = {
    "accessToken": string,
    "refreshToken": string
} 

export type TUserRes = {
    "user": {
        "email": string,
        "name": string
    }
}



