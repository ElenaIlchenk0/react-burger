import { combineReducers } from 'redux';

export const initialState = [
    {
        ingredients: [],
        constructorIngredients: [],
        currentIngredient: {},
        orderReducer: {}
    }
]

// // Редьюсер списка всех полученных ингредиентов
const ingredientsReducer = (state = initialState, action) => { 
    return state
 }

// // Редьюсер списка всех ингредиентов в текущем конструкторе бургера
// const constructorIngReducer = (state = initialState, action) => { ... }

// // Редьюсер текущего просматриваемого ингредиента
// const currentIngReducer = (state = initialState, action) => { ... }

// // Редьюсер созданного заказа
// const orderReducer = (state = initialState, action) => { ... }

export const rootReducer = combineReducers({
    ingredientsReducer,
    // constructorIngReducer,
    // currentIngReducer,
    // orderReducer
}) 
