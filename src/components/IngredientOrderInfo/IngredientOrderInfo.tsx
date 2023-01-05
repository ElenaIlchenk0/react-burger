import React from 'react';
import ingredientOrderInfoStyles from './IngredientOrderInfo.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientOrderInfo = () => {


    return (
        <div className={ingredientOrderInfoStyles.ingredientInfo}>
            <div>
                <div className={ingredientOrderInfoStyles.ingImage}>
                    <img src='https://code.s3.yandex.net/react/code/bun-01-mobile.png' alt='ingredient'></img>
                </div>
                <div>Флюоресцентная булка R2-D3</div>
            </div>
            <div className={ingredientOrderInfoStyles.ingPrice}>
                <span className='text text_type_digits-default'>2</span>
                <span className='text text_type_digits-default'>X</span>
                <span className='text text_type_digits-default'>
                    480
                </span>
                <CurrencyIcon type="primary" />
            </div>
        </div>
    )
}

export default IngredientOrderInfo;
