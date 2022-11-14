import { BURGER_API_URL } from '../../utils/constants'

export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const SET_SELECTED_ING = 'SET_SELECTED_ING';
export const DEL_SELECTED_ING = 'DEL_SELECTED_ING';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DEL_INGREDIENT = 'DEL_INGREDIENT';

export const GET_ORDER_DATA = 'GET_ORDER_DATA';
export const GET_ORDER_DATA_FAILED = 'GET_ORDER_DATA';

export function getAllIngredients() {
    return function (dispatch) {
        fetch(`${BURGER_API_URL}/ingredients`).then((res) => res.ok ? res.json() : res.json().then((err) => Promise.reject(err)))
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
        fetch(`${BURGER_API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "ingredients": ingArray
            })
        }).then((res) => res.ok ? res.json() : res.json().then((err) => Promise.reject(err)))
            .then(res => {
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
            }).catch(err => {
                dispatch({
                    type: GET_ORDER_DATA_FAILED
                })
            })
    }
}
