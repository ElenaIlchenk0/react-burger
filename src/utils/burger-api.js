import { BURGER_API_URL } from './constants.js';
import {request} from './fetchCheckResponse';

export function getIngredients() {
    return request(`${BURGER_API_URL}/ingredients`)
}

export function postOrder(ingredientsId) {
    return request(`${BURGER_API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "ingredients": ingredientsId
        })
    })
}
