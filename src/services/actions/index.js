import { BURGER_API_URL } from '../../utils/constants'
import { v4 as uuidv4 } from 'uuid';
import { request } from '../../utils/fetchCheckResponse'

export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const SET_SELECTED_ING = 'SET_SELECTED_ING';
export const DEL_SELECTED_ING = 'DEL_SELECTED_ING';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const DEL_INGREDIENT = 'DEL_INGREDIENT';
export const DEL_ALL_INGREDIENTS = 'DEL_ALL_INGREDIENTS';
export const SET_ERR_FALSE = 'SET_ERR_FALSE';

export const GET_ORDER_DATA = 'GET_ORDER_DATA';
export const GET_ORDER_DATA_FAILED = 'GET_ORDER_DATA_FAILED';

export function getAllIngredients() {
    return function (dispatch) {
        request(`${BURGER_API_URL}/ingredients`)
            .then(res => {
                if (res.success) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        ingredients: res.data
                    })
                } else {
                    dispatch({
                        type: GET_INGREDIENTS_FAILED
                    })
                }
            }).catch(err => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                })
            })
    }
}

export function getOrder(ingArray) {
    return function (dispatch) {
        request(`${BURGER_API_URL}/orders`, {
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
                dispatch({
                    type: GET_ORDER_DATA,
                    name: res.order.name,
                    number: res.order.number,
                })
            } else {
                dispatch({
                    type: GET_ORDER_DATA_FAILED
                })
            }
        }).then((data) => {
            dispatch({ type: DEL_ALL_INGREDIENTS })
        }).catch(err => {
            dispatch({
                type: GET_ORDER_DATA_FAILED
            })
        })
    }
}

export function addIngredient(content, ingType) {
    return function (dispatch) {
        dispatch({
            type: ADD_INGREDIENT,
            content: { ...content, key: uuidv4() },
            ingType,
        })
    }
}
