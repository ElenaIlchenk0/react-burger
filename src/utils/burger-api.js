import { BURGER_API_URL } from './constants.js';
import { ORDER_API_URL } from './constants.js'
import { checkResponse } from './checkResponse';

export function getIngredients() {
    return fetch(`${BURGER_API_URL}/ingredients`)
        .then(checkResponse)
}

export function postOrder(ingredientsId) {
    return fetch(ORDER_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "ingredients": ingredientsId
        })
    })
        .then(checkResponse)
}