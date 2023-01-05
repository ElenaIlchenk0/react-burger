import React from 'react';
import orderInfoStyles from './OrderInfo.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientOrderInfo from '../IngredientOrderInfo/IngredientOrderInfo'

const OrderInfo = () => {

    return (
        <div className={orderInfoStyles.wrapper}>
            <h1 className='text text_type_digits-medium'>123</h1>
            <p className='text text_type_main-medium mt-5 mb-2'>Black Hole Singularity острый бургер</p>
            <span className={orderInfoStyles.status}>Выполнен</span>
            <div className='mt-8'>
                <h2 className='mt-2 mb-4'>Состав:</h2>
                <div className={orderInfoStyles.filling}>
                    <IngredientOrderInfo />
                    <IngredientOrderInfo />
                    <IngredientOrderInfo />
                    <IngredientOrderInfo />
                    <IngredientOrderInfo />
                </div>
            </div>
            <div className={orderInfoStyles.info}>
                <div className='text_color_inactive'>
                    <FormattedDate date={new Date()} />
                </div>
                <div className={orderInfoStyles.burgerPrice}>
                    <span className='text text_type_digits-default'>
                        480
                    </span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
        
    )
}

export default OrderInfo;
