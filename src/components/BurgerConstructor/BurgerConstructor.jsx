import React, { useState, useEffect } from 'react';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { useSelector, useDispatch } from 'react-redux'
import { getOrder } from '../../services/actions/index'

const BurgerConstructor = (props) => {
    const { bun, otherIngredients } = useSelector(store => store.constructorIngReducer.constructor);
    const { currentOrder } = useSelector(store => store.orderReducer);
    const { isError } = useSelector(store => store.orderReducer);
    const dispatch = useDispatch();

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


    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleClickButton = () => {
        const otherIngIdArray = otherIngredients.map(ing => ing._id);

        dispatch(getOrder([...otherIngIdArray, bun._id]));
        if (!isError) handleOpenModal(true);
    }

    return (

        <div className={`${burgerConstructorStyles.wrapper} pt-25`}>
            <div className={burgerConstructorStyles.menuItemsContainer}>
                {
                    (Object.keys(bun).length > 0) && (
                        <div className={burgerConstructorStyles.bunsTop}>
                            <div className={`${burgerConstructorStyles.menuItem} ${burgerConstructorStyles.menuItemTop}`}>
                                <ConstructorElement
                                    type="top"
                                    isLocked={true}
                                    text={`${bun.name} (верх)`}
                                    price={bun.price}
                                    thumbnail={bun.image_mobile} />
                            </div>
                        </div>
                    )
                }
                {
                    otherIngredients.length > 0 && (
                        <div className={burgerConstructorStyles.mainIngredients}>
                            {
                                otherIngredients.map((ingredient, index) => {
                                    return (
                                        <div className={burgerConstructorStyles.menuItem} key={index}>
                                            <DragIcon type="primary" />
                                            <ConstructorElement
                                                text={ingredient.name}
                                                price={ingredient.price}
                                                thumbnail={ingredient.image_mobile}
                                            />
                                        </div>)
                                }
                                )
                            }
                        </div>
                    )
                }
                {
                    (Object.keys(bun).length > 0) && (
                        <div className={burgerConstructorStyles.bunsBottom}>
                            <div className={`${burgerConstructorStyles.menuItem} ${burgerConstructorStyles.menuItemBottom}`}>
                                <ConstructorElement
                                    type="bottom"
                                    isLocked={true}
                                    text={`${bun.name} (низ)`}
                                    price={bun.price}
                                    thumbnail={bun.image_mobile} />
                            </div>
                        </div>
                    )
                }
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
