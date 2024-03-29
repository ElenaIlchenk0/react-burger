import { BURGER_API_URL } from '../../utils/constants'
import { v4 as uuidv4 } from 'uuid';
import { request } from '../../utils/fetchCheckResponse';
import { getToken } from '../../utils/getToken';
import {
    TError,
    TIngredientsRes,
    TIngredientData,
    TOrderRes,
    TOrder,
    TIngredientType
} from '../../utils/types/types';
import {
    AppThunk,
    AppDispatch
} from '../../utils/types/reduxTypes'


export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';
export const DEL_INGREDIENT: 'DEL_INGREDIENT' = 'DEL_INGREDIENT';
export const DEL_ALL_INGREDIENTS: 'DEL_ALL_INGREDIENTS' = 'DEL_ALL_INGREDIENTS';
export const SET_ERR_FALSE: 'SET_ERR_FALSE' = 'SET_ERR_FALSE';

export const GET_ORDER_DATA: 'GET_ORDER_DATA' = 'GET_ORDER_DATA';
export const GET_ORDER_DATA_FAILED: 'GET_ORDER_DATA_FAILED' = 'GET_ORDER_DATA_FAILED';

export const DEL_ORDER_DATA: 'DEL_ORDER_DATA' = 'DEL_ORDER_DATA'

// Типизация экшенов
export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: Array<TIngredientData>
}

export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IAddIngredientsAction {
    readonly type: typeof ADD_INGREDIENT;
    readonly content: TIngredientData;
    readonly ingType: TIngredientType;
}

export interface IMoveIngredientsAction {
    readonly type: typeof MOVE_INGREDIENT;
    readonly dragIndex: number;
    readonly hoverIndex: number;
}

export interface IDelIngredientsAction {
    readonly type: typeof DEL_INGREDIENT;
    readonly ingType: string;
    readonly content: TIngredientData & { key?: string };
}

export interface IDelAllIngredientsAction {
    readonly type: typeof DEL_ALL_INGREDIENTS;
}

export interface ISetErrFalseAction {
    readonly type: typeof SET_ERR_FALSE;
}

export interface IGetOrderDataAction {
    readonly type: typeof GET_ORDER_DATA;
    readonly name: string;
    readonly number: number;
}

export interface IGetOrderDataFailedAction {
    readonly type: typeof GET_ORDER_DATA_FAILED;
    readonly errMsg: string;
}

export interface IClearOrderDataAction {
    readonly type: typeof DEL_ORDER_DATA;
}

// Union тип
export type TActions =
    | IGetIngredientsSuccessAction
    | IGetIngredientsFailedAction
    | IAddIngredientsAction
    | IMoveIngredientsAction
    | IDelIngredientsAction
    | IDelAllIngredientsAction
    | ISetErrFalseAction
    | IGetOrderDataAction
    | IGetOrderDataFailedAction
    | IClearOrderDataAction;

// Генераторы
export const getIngredientsSuccess = (ingredients: TIngredientData[]): IGetIngredientsSuccessAction => ({
    type: GET_INGREDIENTS_SUCCESS,
    ingredients
});

export const getIngredientsFailed = (): IGetIngredientsFailedAction => ({
    type: GET_INGREDIENTS_FAILED,
});

export const addIngredients = (content: TIngredientData & { key?: string }, ingType: TIngredientType): IAddIngredientsAction => ({
    type: ADD_INGREDIENT,
    content,
    ingType
});

export const moveIngredients = (dragIndex: number, hoverIndex: number): IMoveIngredientsAction => ({
    type: MOVE_INGREDIENT,
    dragIndex,
    hoverIndex,
});

export const delIngredients = (ing: TIngredientData & { key?: string }): IDelIngredientsAction => ({
    type: DEL_INGREDIENT,
    ingType: 'otherIngredients',
    content: ing,
});

export const delAllIngredients = (): IDelAllIngredientsAction => ({
    type: DEL_ALL_INGREDIENTS
});

export const setErrFalse = (): ISetErrFalseAction => ({
    type: SET_ERR_FALSE
});

export const getOrderData = (name: string, number: number): IGetOrderDataAction => ({
    type: GET_ORDER_DATA,
    name,
    number
});

export const getOrderDataFailed = (errMsg: string): IGetOrderDataFailedAction => ({
    type: GET_ORDER_DATA_FAILED,
    errMsg
});

export const clearOrderData = (): IClearOrderDataAction => ({
    type: DEL_ORDER_DATA
});

// api middlewares
export const getAllIngredients = (): AppThunk => (dispatch: AppDispatch) => {
    return request<TIngredientsRes<TIngredientData>>(`${BURGER_API_URL}/ingredients`)
        .then(res => {
            if (res.success) {
                dispatch(getIngredientsSuccess(res.data))
            } else {
                dispatch(getIngredientsFailed())
            }
            return res
        }).catch((err: TError) => {
            dispatch(getIngredientsFailed())
        })
}

export const getOrder = (ingArray: Array<string>): AppThunk =>
    (dispatch: AppDispatch) => {
        request<TOrderRes<TOrder>>(`${BURGER_API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                "ingredients": ingArray
            })
        }).then(res => {
            if (res.success) {
                dispatch(getOrderData(res.order.name, res.order.number))
            }
        }).then((data) => {
            dispatch(delAllIngredients())
        }).catch((err: TError) => {
            if (err.message === 'jwt expired') {
                const tk = localStorage.getItem('refreshToken');
                if (tk) {
                    const getOrderAsync = async () => {
                        getToken(tk).then(() => {
                            dispatch(getOrder(ingArray))
                        }).catch((e) => console.log(e))
                    }
                    getOrderAsync()
                } else {
                    dispatch(getOrderDataFailed(err.message))
                }
            } else {
                dispatch(getOrderDataFailed(err.message))
            }
        })
    }

export const addIngredient = (content: TIngredientData, ingType: TIngredientType): AppThunk => (dispatch: AppDispatch) => {
    const newContent = { ...content, key: uuidv4() }
    dispatch(addIngredients(newContent, ingType))
}

