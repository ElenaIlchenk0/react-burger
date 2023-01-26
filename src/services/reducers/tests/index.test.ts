import { TIngredientData } from '../../../utils/types/types'
import { getIngredientsSuccess, 
    getIngredientsFailed, 
    addIngredients, 
    moveIngredients, 
    delIngredients, 
    delAllIngredients,
    getOrderData,
    getOrderDataFailed,
    setErrFalse,
    clearOrderData,
 } from '../../actions'
import { ingredientsReducer, 
    constructorIngReducer, 
    orderReducer, 
    initialState, 
    TInitialState,
 } from '../index'

describe('IngredientsReducer', () => {
    it('should return the initial state', () => {
        //@ts-ignore
        expect(ingredientsReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        const ingredients: TIngredientData[] = [
            {
                "_id": "60666c42cc7b410027a1a9b6",
                "name": "Биокотлета из марсианской Магнолии",
                "type": "main",
                "proteins": 420,
                "fat": 142,
                "carbohydrates": 242,
                "calories": 4242,
                "price": 424,
                "image": "https://code.s3.yandex.net/react/code/meat-01.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
                "__v": 0
            },
            {
                "_id": "60666c42cc7b410027a1a9b7",
                "name": "Соус Spicy-X",
                "type": "sauce",
                "proteins": 30,
                "fat": 20,
                "carbohydrates": 40,
                "calories": 30,
                "price": 90,
                "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
                "__v": 0
            },
            {
                "_id": "60666c42cc7b410027a1a9b4",
                "name": "Мясо бессмертных моллюсков Protostomia",
                "type": "main",
                "proteins": 433,
                "fat": 244,
                "carbohydrates": 33,
                "calories": 420,
                "price": 1337,
                "image": "https://code.s3.yandex.net/react/code/meat-02.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
                "__v": 0
            }
        ];
        expect(
            ingredientsReducer(undefined, getIngredientsSuccess(ingredients))
        ).toEqual({
            ...initialState,
            ingredients
        })
    })

    it('should return state with error: true', () => {
        expect(
            ingredientsReducer(undefined, getIngredientsFailed())
        ).toEqual({
            ...initialState,
            isError: true
        })
    })
}) 

describe('СonstructorIngReducer', () => {
    const newStore: TInitialState = {
        ...initialState,
        constructor: {
            bun: null,
            otherIngredients: [{
                "_id": "60666c42cc7b410027a1a9b5",
                "name": "Говяжий метеорит (отбивная)",
                "type": "main",
                "proteins": 800,
                "fat": 800,
                "carbohydrates": 300,
                "calories": 2674,
                "price": 3000,
                "image": "https://code.s3.yandex.net/react/code/meat-04.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
                "__v": 0,
                "key": "7332jfsljss"
            }, {
                "_id": "60666c42cc7b410027a1a9b6",
                "name": "Биокотлета из марсианской Магнолии",
                "type": "main",
                "proteins": 420,
                "fat": 142,
                "carbohydrates": 242,
                "calories": 4242,
                "price": 424,
                "image": "https://code.s3.yandex.net/react/code/meat-01.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
                "__v": 0,
                "key": "8332jfsljsl"
            }]
        },
    }
    const bun: TIngredientData & { key?: string } =
    {
        "_id": "60666c42cc7b410027a1a9b1",
        "name": "Краторная булка N-200i",
        "type": "bun",
        "proteins": 80,
        "fat": 24,
        "carbohydrates": 53,
        "calories": 420,
        "price": 1255,
        "image": "https://code.s3.yandex.net/react/code/bun-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
        "__v": 0,
        "key": "9385jfkjsd"
    }
    const mainIng: TIngredientData & { key?: string } = {
        "_id": "60666c42cc7b410027a1a9b5",
        "name": "Говяжий метеорит (отбивная)",
        "type": "main",
        "proteins": 800,
        "fat": 800,
        "carbohydrates": 300,
        "calories": 2674,
        "price": 3000,
        "image": "https://code.s3.yandex.net/react/code/meat-04.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
        "__v": 0,
        "key": "9332jfsljsd"
    }

    it('should return the initial state', () => {
        //@ts-ignore
        expect(constructorIngReducer(undefined, {})).toEqual(initialState)
    })

    it('should add bun to store', () => {
        expect(
            constructorIngReducer(initialState, addIngredients(bun, 'bun'))
        ).toEqual({
            ...initialState,
            constructor: {
                bun: bun,
                otherIngredients: []
            },
        })
    })

    it('should add other ingredient to empty store', () => {
        expect(
            constructorIngReducer(initialState, addIngredients(mainIng, 'otherIngredients'))
        ).toEqual({
            ...initialState,
            constructor: {
                bun: null,
                otherIngredients: [{
                        "_id": "60666c42cc7b410027a1a9b5",
                        "name": "Говяжий метеорит (отбивная)",
                        "type": "main",
                        "proteins": 800,
                        "fat": 800,
                        "carbohydrates": 300,
                        "calories": 2674,
                        "price": 3000,
                        "image": "https://code.s3.yandex.net/react/code/meat-04.png",
                        "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                        "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
                        "__v": 0,
                        "key": "9332jfsljsd"
                    }]
            },
        })
    })

    it('should add other ingredient to not empty store', () => {
        expect(
            constructorIngReducer(newStore, addIngredients(mainIng, 'otherIngredients'))
        ).toEqual({
            ...newStore,
            constructor: {
                bun: null,
                otherIngredients: [{
                    "_id": "60666c42cc7b410027a1a9b5",
                    "name": "Говяжий метеорит (отбивная)",
                    "type": "main",
                    "proteins": 800,
                    "fat": 800,
                    "carbohydrates": 300,
                    "calories": 2674,
                    "price": 3000,
                    "image": "https://code.s3.yandex.net/react/code/meat-04.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
                    "__v": 0,
                    "key": "7332jfsljss"
                }, {
                    "_id": "60666c42cc7b410027a1a9b6",
                    "name": "Биокотлета из марсианской Магнолии",
                    "type": "main",
                    "proteins": 420,
                    "fat": 142,
                    "carbohydrates": 242,
                    "calories": 4242,
                    "price": 424,
                    "image": "https://code.s3.yandex.net/react/code/meat-01.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
                    "__v": 0,
                    "key": "8332jfsljsl"
                }, {
                    "_id": "60666c42cc7b410027a1a9b5",
                    "name": "Говяжий метеорит (отбивная)",
                    "type": "main",
                    "proteins": 800,
                    "fat": 800,
                    "carbohydrates": 300,
                    "calories": 2674,
                    "price": 3000,
                    "image": "https://code.s3.yandex.net/react/code/meat-04.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
                    "__v": 0,
                    "key": "9332jfsljsd"
                }]
            },
        })
    })

    it('should move ingredient correctly', () => {
        expect(
            constructorIngReducer(newStore, moveIngredients(0, 1))
        ).toEqual({
            ...newStore,
            constructor: {
                bun: null,
                otherIngredients: [{
                    "_id": "60666c42cc7b410027a1a9b6",
                    "name": "Биокотлета из марсианской Магнолии",
                    "type": "main",
                    "proteins": 420,
                    "fat": 142,
                    "carbohydrates": 242,
                    "calories": 4242,
                    "price": 424,
                    "image": "https://code.s3.yandex.net/react/code/meat-01.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
                    "__v": 0,
                    "key": "8332jfsljsl"
                }, {
                    "_id": "60666c42cc7b410027a1a9b5",
                    "name": "Говяжий метеорит (отбивная)",
                    "type": "main",
                    "proteins": 800,
                    "fat": 800,
                    "carbohydrates": 300,
                    "calories": 2674,
                    "price": 3000,
                    "image": "https://code.s3.yandex.net/react/code/meat-04.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
                    "__v": 0,
                    "key": "7332jfsljss"
                }]
            },
        })
    })

    it('should delete one ingredient correctly', () => {
        expect(
            constructorIngReducer(newStore, delIngredients({
                "_id": "60666c42cc7b410027a1a9b6",
                "name": "Биокотлета из марсианской Магнолии",
                "type": "main",
                "proteins": 420,
                "fat": 142,
                "carbohydrates": 242,
                "calories": 4242,
                "price": 424,
                "image": "https://code.s3.yandex.net/react/code/meat-01.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
                "__v": 0,
                "key": "8332jfsljsl"
            }))
        ).toEqual({
            ...newStore,
            constructor: {
                bun: null,
                otherIngredients: [{
                    "_id": "60666c42cc7b410027a1a9b5",
                    "name": "Говяжий метеорит (отбивная)",
                    "type": "main",
                    "proteins": 800,
                    "fat": 800,
                    "carbohydrates": 300,
                    "calories": 2674,
                    "price": 3000,
                    "image": "https://code.s3.yandex.net/react/code/meat-04.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
                    "__v": 0,
                    "key": "7332jfsljss"
                }]
            },
        })
    })

    it('should delete all ingredients', () => {
        expect(
            constructorIngReducer(newStore, delAllIngredients())
        ).toEqual({
            ...newStore,
            constructor: {
                bun: null,
                otherIngredients: []
            },
        })
    })
}) 

describe('OrderReducer', () => {
    it('should return the initial state', () => {
        //@ts-ignore
        expect(orderReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle GET_ORDER_DATA', () => {
        expect(
            orderReducer(initialState, getOrderData('name', 123))
        ).toEqual({
            ...initialState,
            currentOrder: {
                name: 'name',
                number: 123
            }
        })
    })

    it('should return error: true, error message and empty order data', () => {
        const newState = {
            ...initialState, 
            currentOrder: {
                name: 'name',
                number: 123
            } 
        }

        expect(
            orderReducer(newState, getOrderDataFailed('error'))
        ).toEqual({
            ...newState,
            currentOrder: {
                name: '',
                number: 0
            },
            isError: true,
            errMsg: 'error'
        })
    })

    it('should remove error from store', () => {
        const newState = { ...initialState, isError: true, errMsg: 'error'}
        expect(
            orderReducer(newState, setErrFalse())
        ).toEqual({
            ...newState,
            isError: false,
            errMsg: ''
        })
    })

    it('should remove order info from store', () => {
        const newState = {
            ...initialState,
            currentOrder: {
                name: 'name',
                number: 123
            }
        }

        expect(
            orderReducer(newState, clearOrderData())
        ).toEqual({
            ...newState,
            currentOrder: {
                name: '',
                number: 0
            },
            isError: false,
            errMsg: ''
        })
    })
}) 

