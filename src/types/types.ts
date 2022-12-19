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

export type TError = { message: string }

export type TUser = {
    name: string,
    email: string,
    pass: string,
} 

export type TLogRegResponse = {
    success: boolean,
    user: Omit<TUser, "password">,
    accessToken: string,
    refreshToken: string,
}

export type TAuthUser = Omit<TLogRegResponse, "accessToken" | "refreshToken">

export type TRefreshToken = Omit<TLogRegResponse, "user">

export type TPlainResponse = {
    success: boolean,
    message: string
}

