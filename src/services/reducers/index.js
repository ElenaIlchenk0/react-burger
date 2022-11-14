import { combineReducers } from 'redux';
import { GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from '../actions/index';
import { SET_SELECTED_ING, DEL_SELECTED_ING } from '../actions/index';
import { ADD_INGREDIENT, DEL_INGREDIENT } from '../actions/index';
import { GET_ORDER_DATA, GET_ORDER_DATA_FAILED } from '../actions/index';

export const initialState = {
    ingredients: [],
    selectedIngredient: {},
    constructor: {
        bun: {},
        otherIngredients: []
    },
    currentOrder: {
        name: '',
        number: ''
    },
    orderReducer: {},
    isError: false,
}

// Редьюсер списка всех полученных ингредиентов
const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.ingredients,
                isError: false,
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                isError: true,
            };
        }
        default: {
            return state
        }
    }

}
// Редьюсер списка всех ингредиентов в конструкторе бургера
const constructorIngReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT: {

            const content = action.ingType === 'bun'
                ? action.content
                : state.constructor.otherIngredients = [...state.constructor.otherIngredients, action.content]

            return {
                ...state,
                constructor: {
                    ...state.constructor,
                    [action.ingType]: content,
                }
            }
        }
        case DEL_INGREDIENT: {

            const content = state.constructor.otherIngredients.filter(el => el.key !== action.content.key)
            
            return {
                ...state,
                constructor: {
                    ...state.constructor,
                    [action.ingType]: content
                }
            };
        }
        default: {
            return state
        }
    }
}

// Редьюсер текущего просматриваемого ингредиента
const currentIngReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECTED_ING: {
            return {
                ...state,
                selectedIngredient: action.selected
            };
        }
        case DEL_SELECTED_ING: {
            return {
                ...state,
                selectedIngredient: {}
            };
        }
        default: {
            return state
        }
    }
}

// // Редьюсер созданного заказа
const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_DATA: {
            return {
                ...state,
                currentOrder: {
                    name: action.name,
                    number: action.number
                },
                isError: false,
            };
        }
        case GET_ORDER_DATA_FAILED: {
            return {
                ...state,
                currentOrder: {
                    name: '',
                    number: 0
                },
                isError: true,
            };
        }
        default: {
            return state
        }
    }
}

export const rootReducer = combineReducers({
    ingredientsReducer,
    constructorIngReducer,
    currentIngReducer,
    orderReducer
}) 
