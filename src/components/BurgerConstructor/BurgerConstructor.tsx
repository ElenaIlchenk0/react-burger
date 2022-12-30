import React, { useState, useEffect } from 'react';
import burgerConstructorStyles from './BurgerConstructor.module.css';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import MainIngredient from '../MainIngredient/MainIngredient';

import { useSelector, useDispatch } from '../../types/types';
import { getOrder, addIngredient, delIngredients, setErrFalse } from '../../services/actions/index';
import { useDrop } from 'react-dnd';
import { useHistory } from 'react-router-dom';
import { TIngredientData, THistoryFrom } from '../../types/types';

type TElement = {
    item: TIngredientData;
}

const BurgerConstructor = () => {
    const { bun, otherIngredients } = useSelector(store => store.constructorIngReducer.constructor);
    const { currentOrder } = useSelector(store => store.orderReducer);
    const { isError, errMsg } = useSelector(store => store.orderReducer);
    const { user } = useSelector(store => store.setUserReducer);
    const dispatch = useDispatch();
    const history = useHistory<THistoryFrom>();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const getTotalPrice = (): number => {
            let total: number;
            let fillingPrice: number;
            const fillingPriceResult: number = otherIngredients.length > 0 
                                            ? otherIngredients.reduce((result: number, ingredient: TIngredientData) => result += ingredient.price, 0)
                                            : 0;
            
            if (bun && otherIngredients.length > 0) { 
                fillingPrice = fillingPriceResult;
                total = fillingPrice + bun.price * 2;
                return total;
            } else if (bun) {
                return total = bun.price * 2;
            } else {
                return total = fillingPriceResult;
            }
        }
        if (bun || otherIngredients.length > 0) setTotalPrice(getTotalPrice())
        else { setTotalPrice(0)}
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
        if (user && errMsg === ('jwt malformed')) {
            dispatch(setErrFalse())
        }
    }, [user, errMsg])

    const [{ canDrop, isOver }, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item: TElement) {
            handleDrop(item);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const handleDrop = (el: TElement) => {
        const type: string = el.item.type === 'bun' ? 'bun' : 'otherIngredients';
        dispatch(addIngredient(el.item, type))
    }

    const handleOpenModal = (): void => {
        setIsModalOpen(true);
    }

    const handleCloseModal = (): void => {
        setIsModalOpen(false);
    }

    const handleClickButton = (): void => {
        const otherIngIdArray: string[] = otherIngredients.map((ing: TIngredientData) => ing._id);
        dispatch(getOrder([...otherIngIdArray, bun!._id]));
        handleOpenModal();
    }

    const handleDelIngredient = (ing: TIngredientData): void => {
        dispatch(delIngredients(ing))
    }

    return (

        <div className={`${burgerConstructorStyles.wrapper} pt-25`}>
            <div ref={dropTarget}
                className={burgerConstructorStyles.menuItemsContainer}
                style={{ backgroundColor: isOver ? '#8585AD' : canDrop ? '#2f2f37' : 'initial' }}>

                <div className={`${burgerConstructorStyles.menuItem} ${burgerConstructorStyles.menuItemTop}`}>
                    {
                        bun && (
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
                                    // key={ingredient.key} dnd так работает некорректно... fix bag?
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
                        bun && (
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
