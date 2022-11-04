import React, { useState, useRef } from 'react';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import TabMenu from '../TabMenu/TabMenu';
import IngredientItem from '../IngredientItem/IngredientItem';
import PropTypes from 'prop-types';
import { burgerDataPropTypes } from '../../prop-types';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

const BurgerIngredients = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState();

    const refBuns = useRef();
    const refSauces = useRef();
    const refMain = useRef();

    const handleOpenModal = (id) => {
        const ingredientInfo = props.burgerData.find((ing) => ing._id === id);
        setSelectedIngredient(ingredientInfo);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleClickTab = (value) => {
        value === 'buns' ?
            refBuns.current.scrollIntoView({ behavior: 'smooth' })
            : value === 'sauces' ?
                refSauces.current.scrollIntoView({ behavior: 'smooth' })
                : refMain.current.scrollIntoView({ behavior: 'smooth' })
    }

    const buns = props.burgerData.filter((data) => data.type === 'bun');
    const sauces = props.burgerData.filter((data) => data.type === 'sauce');
    const main = props.burgerData.filter((data) => data.type === 'main');

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
                isModalOpen && selectedIngredient &&
                <Modal header='Детали ингредиента' onClose={handleCloseModal} >
                    <IngredientDetails ingredient={selectedIngredient}/>
                </Modal>
            }
        </div>
    )
}


BurgerIngredients.propTypes = {
    burgerData: PropTypes.arrayOf(burgerDataPropTypes).isRequired,
};

export default BurgerIngredients;