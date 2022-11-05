import React, { useState, useMemo } from 'react';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { burgerDataPropTypes } from '../../prop-types'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';

const BurgerConstructor = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const someBun = useMemo(() => props.burgerData.find((item) => item.type === 'bun'));
    const otherIng = useMemo(() => props.burgerData.filter((item) => item.type !== 'bun'));

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    return (

        <div className={`${burgerConstructorStyles.wrapper} pt-25`}>
            <div className={burgerConstructorStyles.menuItemsContainer}>
                    <div className={burgerConstructorStyles.bunsTop}>
                        <div className={`${burgerConstructorStyles.menuItem} ${burgerConstructorStyles.menuItemTopBottom}`}>
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
                        <div className={`${burgerConstructorStyles.menuItem} ${burgerConstructorStyles.menuItemTopBottom}`}>
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
                    <p className={'text text_type_digits-medium'}>610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button onClick={handleOpenModal}
                    htmlType="button"
                    type="primary"
                    size="medium">
                    Оформить заказ
                </Button>
                {
                    isModalOpen &&
                    <Modal onClose={handleCloseModal} > 
                        <OrderDetails />
                    </Modal>
                }
            </div>
        </div>

    )
}

BurgerConstructor.propTypes = {
    burgerData: PropTypes.arrayOf(burgerDataPropTypes).isRequired,
};

export default BurgerConstructor;