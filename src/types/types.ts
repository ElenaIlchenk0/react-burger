import H from "history";
import { store } from '../index';
import { TActions } from '../services/actions/index';
import { TUserActions } from '../services/actions/userInfo';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';
import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
import type { } from 'redux-thunk/extend-redux'

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

export type TIngredientsRes<TIngredientData> = {
    success: boolean,
    data: TIngredientData[],
}

export type TOrderRes<TIngredientData> = {
    success: boolean,
    name: string,
    order: {
        createdAt: string,
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
        updatedAt: string,
        _id: string
    }
}

export type RootState = ReturnType<typeof store.getState>; 

export type TAppActions = TActions | TUserActions

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TAppActions>>;

// export type AppDispatch = Dispatch<TAppActions>; 

// export const useSelector: TypedUseSelectorHook<RootState> = selectorHook; 

//export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();

export type AppDispatch<TReturnType = void> = (action: TAppActions | AppThunk) => TReturnType;
export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
