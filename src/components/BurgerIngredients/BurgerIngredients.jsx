import React, { useState, useRef, useMemo, useContext } from 'react';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import TabMenu from '../TabMenu/TabMenu';
import IngredientItem from '../IngredientItem/IngredientItem';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { BurgerDataContext } from '../../services/burgerDataContext';

const BurgerIngredients = (props) => {
    const { ingredients } = useContext(BurgerDataContext);
    const [selectedIngredient, setSelectedIngredient] = useState(null);

    const refBuns = useRef();
    const refSauces = useRef();
    const refMain = useRef();

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

    const buns = useMemo(() => ingredients.filter((data) => data.type === 'bun'), [ingredients]);
    const sauces = useMemo(() => ingredients.filter((data) => data.type === 'sauce'), [ingredients]);
    const main = useMemo(() => ingredients.filter((data) => data.type === 'main'), [ingredients]);

    return (
        <div className={`${burgerIngredientsStyles.wrapper} pt-10`}>
            <h1>Соберите бургер</h1>
            <TabMenu onClickTab={handleClickTab} />
            <div className={burgerIngredientsStyles.ingredientsContainer}>
                <div>
                    <div className={burgerIngredientsStyles.ingredients}>
                        <h2 ref={refBuns}>Булки</h2>
                        {
                            buns.map((item) =>
                                <IngredientItem
                                    burgerData={item}
                                    key={item._id}
                                    onOpenModal={handleOpenModal} />)
                        }
                    </div>
                </div>
                <div>
                    <div className={burgerIngredientsStyles.ingredients}>
                        <h2 ref={refSauces}>Соусы</h2>
                        {
                            sauces.map((item) =>
                                <IngredientItem
                                    burgerData={item}
                                    key={item._id}
                                    onOpenModal={handleOpenModal} />)
                        }
                    </div>
                </div>
                <div>
                    <div className={burgerIngredientsStyles.ingredients}>
                        <h2 ref={refMain}>Начинки</h2>
                        {
                            main.map((item) =>
                                <IngredientItem
                                    burgerData={item}
                                    key={item._id}
                                    onOpenModal={handleOpenModal} />)
                        }
                    </div>
                </div>
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