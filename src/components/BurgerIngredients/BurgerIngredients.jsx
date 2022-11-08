import React, { useState, useRef, useMemo, useContext } from 'react';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import TabMenu from '../TabMenu/TabMenu';
// import IngredientItem from '../IngredientItem/IngredientItem';
import IngredientsCategory from '../IngredientsCategory/IngredientsCategory';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { BurgerDataContext } from '../../services/burgerDataContext';

const BurgerIngredients = (props) => {
    const { ingredients } = useContext(BurgerDataContext);
    const [selectedIngredient, setSelectedIngredient] = useState(null);

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
        setSelectedIngredient(ingredientInfo);
    }

    const handleCloseModal = () => {
        setSelectedIngredient(null);
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
            {
                selectedIngredient &&
                <Modal header='Детали ингредиента' onClose={handleCloseModal} >
                    <IngredientDetails ingredient={selectedIngredient} />
                </Modal>
            }
        </div>
    )
}


export default BurgerIngredients;
