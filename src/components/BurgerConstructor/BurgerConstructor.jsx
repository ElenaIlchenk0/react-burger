import React, { useState, useMemo, useContext, useEffect } from 'react';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { BurgerDataContext } from '../../services/burgerDataContext';
import { postOrder } from '../../utils/burger-api';

const BurgerConstructor = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { ingredients } = useContext(BurgerDataContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [currentOrder, setCurrentOrder] = useState();

    const someBun = useMemo(() => ingredients.find((item) => item.type === 'bun'), [ingredients]);
    const otherIng = useMemo(() => ingredients.filter((item) => item.type !== 'bun'), [ingredients]);

    useEffect(() => {
        const fillingPrice = otherIng.reduce((result, ingredient) => result += ingredient.price, 0)
        const total = fillingPrice + someBun.price * 2;
        setTotalPrice(total)
    }, [someBun, otherIng])

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleClickButton = () => {
        postOrder(ingredients.map(ing => ing._id))
            .then((data) => {
                if (data.success) { setCurrentOrder(data); handleOpenModal(true); }
                else { Promise.reject(data) }
            })
            .catch((err) => console.log(err))
    }

    return (

        <div className={`${burgerConstructorStyles.wrapper} pt-25`}>
            <div className={burgerConstructorStyles.menuItemsContainer}>
                <div className={burgerConstructorStyles.bunsTop}>
                    <div className={`${burgerConstructorStyles.menuItem} ${burgerConstructorStyles.menuItemTop}`}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${someBun.name} (верх)`}
                            price={someBun.price}
                            thumbnail={someBun.image_mobile} />
                    </div>
                </div>
                <div className={burgerConstructorStyles.mainIngredients}>
                    {
                        otherIng.map((ingredient, index) =>
                            <div className={burgerConstructorStyles.menuItem} key={index}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image_mobile}
                                />
                            </div>
                        )
                    }
                </div>
                <div className={burgerConstructorStyles.bunsBottom}>
                    <div className={`${burgerConstructorStyles.menuItem} ${burgerConstructorStyles.menuItemBottom}`}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${someBun.name} (низ)`}
                            price={someBun.price}
                            thumbnail={someBun.image_mobile} />
                    </div>

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
                            orderNumber={currentOrder.order.number}
                        />
                    </Modal>
                }
            </div>
        </div>

    )
}

export default BurgerConstructor;
