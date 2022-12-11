import React, { useState, useEffect } from 'react';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { useSelector, useDispatch } from 'react-redux';
import { getOrder } from '../../services/actions/index';
import { DEL_INGREDIENT, SET_ERR_FALSE } from '../../services/actions/index';
import { useDrop } from 'react-dnd';
import { addIngredient } from '../../services/actions/index';
import MainIngredient from '../MainIngredient/MainIngredient';
import { useHistory } from 'react-router-dom';

const BurgerConstructor = (props) => {
    const { bun, otherIngredients } = useSelector(store => store.constructorIngReducer.constructor);
    const { currentOrder } = useSelector(store => store.orderReducer);
    const { isError } = useSelector(store => store.orderReducer);
    const { user } = useSelector(store => store.setUserReducer);
    const dispatch = useDispatch();
    const history = useHistory();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const getTotalPrice = () => {
            if (bun && otherIngredients.length > 0) {
                const fillingPrice = otherIngredients.reduce((result, ingredient) => result += ingredient.price, 0)
                const total = fillingPrice + bun.price * 2;
                return total;
            }
            return 0
        }

        setTotalPrice(getTotalPrice())
    }, [bun, otherIngredients])

    useEffect(() => {
        if (isError && isModalOpen) {
            history.push({
                pathname: '/login',
                state: { from: '/' }
            })
        }
    }, [isError, isModalOpen])

    useEffect(() => {
        if (user) { dispatch({ type: SET_ERR_FALSE }) }
    }, [user])

    const [{ canDrop, isOver }, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item) {
            handleDrop(item);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const handleDrop = (el) => {
        const type = el.item.type === 'bun' ? 'bun' : 'otherIngredients';
        dispatch(addIngredient(el.item, type))
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleClickButton = () => {
        const otherIngIdArray = otherIngredients.map(ing => ing._id);

        dispatch(getOrder([...otherIngIdArray, bun._id]));
        handleOpenModal(true);
    }

    const handleDelIngredient = (ing) => {
        dispatch({
            type: DEL_INGREDIENT,
            ingType: 'otherIngredients',
            content: ing
        })
    }

    return (

        <div className={`${burgerConstructorStyles.wrapper} pt-25`}>
            <div ref={dropTarget}
                className={burgerConstructorStyles.menuItemsContainer}
                style={isOver ? { backgroundColor: '#8585AD' } : canDrop ? { backgroundColor: '#2f2f37' } : null}>

                <div className={`${burgerConstructorStyles.menuItem} ${burgerConstructorStyles.menuItemTop}`}>
                    {
                        (Object.keys(bun).length > 0) && (
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image_mobile} />
                        )
                    }
                </div>
                <div className={burgerConstructorStyles.mainIngredients}>
                    {
                        (otherIngredients.length > 0) && (
                            otherIngredients.map((ingredient, index) =>
                                <MainIngredient 
                                    // key={ingredient.key} dnd так работает некорректно
                                    key={index} // так ок
                                    ingredient={ingredient}
                                    index={index}
                                    onDelete={handleDelIngredient} />

                            )
                        )
                    }
                </div>
                <div className={`${burgerConstructorStyles.menuItem} ${burgerConstructorStyles.menuItemBottom}`}>
                    {
                        (Object.keys(bun).length > 0) && (
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${bun.name} (низ)`}
                                price={bun.price}
                                thumbnail={bun.image_mobile}
                            />
                        )
                    }
                </div>
            </div>

            <div className={burgerConstructorStyles.orderSummary}>
                <div className={burgerConstructorStyles.price}>
                    <p className={'text text_type_digits-medium'}>
                        {totalPrice}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button onClick={handleClickButton}
                    htmlType="button"
                    type="primary"
                    size="medium">
                    Оформить заказ
                </Button>
                {
                    isModalOpen &&
                    <Modal onClose={handleCloseModal} >
                        <OrderDetails
                            orderNumber={currentOrder.number}
                        />
                    </Modal>
                }
            </div>
        </div>

    )
}

export default BurgerConstructor;
