import { combineReducers } from 'redux';
import { GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from '../actions/index';
import { ADD_INGREDIENT, MOVE_INGREDIENT, DEL_INGREDIENT, DEL_ALL_INGREDIENTS, SET_ERR_FALSE } from '../actions/index';
import { GET_ORDER_DATA, GET_ORDER_DATA_FAILED } from '../actions/index';
import update from 'immutability-helper';
import { setUserReducer } from './userInfo';
import { TIngredientData } from '../../types/types';
import { TActions } from '../actions/index';
import { wsReducer } from './orders';

type TInitialState = {
    ingredients: TIngredientData[];
    constructor: {
        bun: TIngredientData | null;
        otherIngredients: Array<TIngredientData & { key?: string }>;
    };
    currentOrder: {
        name: string;
        number: number;
    };
    isError: boolean;
    errMsg: string;
}

export const initialState: TInitialState = {
    ingredients: [],
    constructor: {
        bun: null,
        otherIngredients: []
    },
    currentOrder: {
        name: '',
        number: 0
    },
    isError: false,
    errMsg: ''
}

const ingredientsReducer = (state = initialState, action: TActions): TInitialState => {
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

const constructorIngReducer = (state = initialState, action: TActions): TInitialState => {
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
        case MOVE_INGREDIENT: {
            const prevIngredients = state.constructor.otherIngredients;

            return {
                ...state,
                constructor: {
                    ...state.constructor,
                    otherIngredients: update(prevIngredients, {
                        $splice: [
                            [action.dragIndex, 1],
                            [action.hoverIndex, 0, prevIngredients[action.dragIndex]],
                        ],
                    })
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
        case DEL_ALL_INGREDIENTS: {
            return {
                ...state,
                constructor: {
                    bun: null,
                    otherIngredients: []
                }
            };
        }
        default: {
            return state
        }
    }
}

const orderReducer = (state = initialState, action: TActions): TInitialState => {
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
                errMsg: action.errMsg
            };
        }
        case SET_ERR_FALSE: {
            return {
                ...state,
                isError: false,
                errMsg: ''
            }
        }
        default: {
            return state
        }
    }
}



export const rootReducer = combineReducers({
    ingredientsReducer,
    constructorIngReducer,
    orderReducer,
    setUserReducer,
    wsReducer
}) 
