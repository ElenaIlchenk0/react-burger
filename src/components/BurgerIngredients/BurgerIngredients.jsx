import React, { useRef, useMemo, useEffect } from 'react';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import TabMenu from '../TabMenu/TabMenu';
import IngredientsCategory from '../IngredientsCategory/IngredientsCategory';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { useSelector, useDispatch } from 'react-redux';
import { getAllIngredients } from '../../services/actions/index';
import { SET_SELECTED_ING, DEL_SELECTED_ING } from '../../services/actions/index';
import { ADD_INGREDIENT } from '../../services/actions/index'

const BurgerIngredients = () => {
    const { ingredients, isError } = useSelector(store => store.ingredientsReducer);
    const { selectedIngredient } = useSelector(store => store.currentIngReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllIngredients())
    }, [dispatch])

    const refBuns = useRef();
    const refSauces = useRef();
    const refMain = useRef();

    const buns = useMemo(() => ingredients.filter((data) => data.type === 'bun'), [ingredients]);
    const sauces = useMemo(() => ingredients.filter((data) => data.type === 'sauce'), [ingredients]);
    const main = useMemo(() => ingredients.filter((data) => data.type === 'main'), [ingredients]);

    const dataCategories = [
        {
            data: buns,
            refItem: refBuns,
            name: 'Булки'
        },
        {
            data: sauces,
            refItem: refSauces,
            name: 'Соусы'
        },
        {
            data: main,
            refItem: refMain,
            name: 'Начинки'
        }
    ]

    const handleOpenModal = (id) => {
        const ingredientInfo = ingredients.find((ing) => ing._id === id);
        dispatch({ type: SET_SELECTED_ING, selected: ingredientInfo });
        dispatch({
            type: ADD_INGREDIENT,
            content: ingredientInfo,
            ingType: ingredientInfo.type === 'bun' ? 'bun' : 'otherIngredients'
        })
    }

    const handleCloseModal = () => {
        dispatch({ type: DEL_SELECTED_ING })
    }

    const handleClickTab = (value) => {
        switch (value) {
            case 'buns': refBuns.current.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'sauces': refSauces.current.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'main': refMain.current.scrollIntoView({ behavior: 'smooth' });
                break;
            // no default
        }
    }

    return (
        <div className={`${burgerIngredientsStyles.wrapper} pt-10`}>
            <h1>Соберите бургер</h1>
            <TabMenu onClickTab={handleClickTab} />
            {
                !isError && ingredients.length > 0 && (
                    <div className={burgerIngredientsStyles.ingredientsContainer}>
                        {
                            dataCategories.map((category, index) =>
                                <IngredientsCategory
                                    category={category.name}
                                    data={category.data}
                                    refItem={category.refItem}
                                    onOpenModal={handleOpenModal}
                                    key={index}
                                />
                            )
                        }
                    </div>
                )
            }
            {
                (Object.keys(selectedIngredient).length > 0) &&
                <Modal header='Детали ингредиента' onClose={handleCloseModal} >
                    <IngredientDetails ingredient={selectedIngredient} />
                </Modal>
            }
        </div>
    )
}

export default BurgerIngredients;
