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

//api response types
export type TUser = {
    name: string,
    email: string,
    pass: string,
    token?: string,
} 

export type TOrder = {
    ingredients: TIngredientData[],
    name: string,
    number: number,
    owner: {
        createdAt: string,
        name: string,
        email: string,
        updatedAt: string
    },
    price: number,
    status: string,
    createdAt: string,
    updatedAt: string,
    _id: string
}

export type TOrdersAll = Omit<TOrder, 'ingredients' | 'price'> & { ingredients: string[]}

export type TError = { message: string }

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

export type TIngredientsRes<TIngredientData> = {
    success: boolean,
    data: TIngredientData[],
}

export type TOrderRes<TOrder> = {
    success: boolean,
    name: string,
    order: TOrder
}

export type TAllOrdersRes<TOrdersAll> = {
    success: boolean,
    orders: TOrdersAll[],
    total: number,
    totalToday: number
}

//ws
export enum WebSocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}
