import { BURGER_API_URL } from './constants.js'
import { checkResponse } from './checkResponse';

export function getIngredients() {
    return fetch(`${BURGER_API_URL}/ingredients`)
        .then(checkResponse)
}