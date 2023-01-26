import { TIngredientData } from '../../utils/types/types';
import * as actions from './index'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { useDispatch } from '../../utils/types/reduxTypes';
import { BURGER_API_URL } from '../../utils/constants';

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

describe('Action creators', () => {
    it('getIngredientsSuccess should create an action with correct ingredients', () => {

        // Эталонный экшен
        const expectedAction = {
            type: actions.GET_INGREDIENTS_SUCCESS,
            ingredients
        }
        
        // Проверяем экшены на равенство
        expect(actions.getIngredientsSuccess(ingredients)).toEqual(expectedAction)
    })

    it('addIngredients should create an action with correct ingredients', () => {
        const content: TIngredientData & { key?: string } = 
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
                "__v": 0,
                "key": "834jflkjkdjgbnj4"
            }
        
        const ingType = 'otherIngredients'

        const expectedAction = {
            type: actions.ADD_INGREDIENT,
            content,
            ingType
        }

        expect(actions.addIngredients(content, ingType)).toEqual(expectedAction)
    })
}) 


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('thunk actions', () => {
    const response = { success: true, result: 'ok', data: ingredients }
    beforeEach(() => {
        const res = new Response();
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ...res,
            json: jest.fn().mockResolvedValue(response),
            ok: true
        })
    })

    afterEach(() => {jest.restoreAllMocks()})

    it('calls GET_INGREDIENTS_SUCCESS action when ingredients has been received', () => {
        const expectedActions = [
            { type: actions.GET_INGREDIENTS_SUCCESS, ingredients: response.data }
        ]
        const store = mockStore({ ingredients: [] })

        //@ts-ignore
        return store.dispatch(actions.getAllIngredients()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
