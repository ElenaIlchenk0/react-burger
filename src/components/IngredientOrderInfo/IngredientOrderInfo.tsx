import React from 'react';
import ingredientOrderInfoStyles from './IngredientOrderInfo.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredientData } from '../../utils/types/types';

interface IIngredientOrderInfo {
    count: number;
    ingInfo: TIngredientData | null;
}

const IngredientOrderInfo: React.FC<IIngredientOrderInfo> = ({ count, ingInfo }) => {
    return (
        ingInfo && (
            <div className={ingredientOrderInfoStyles.ingredientInfo}>
                <div>
                    <div className={ingredientOrderInfoStyles.ingImage}>
                        <img src={ ingInfo.image_mobile } alt='ingredient'></img>
                    </div>
                    <div>{ingInfo.name}</div>
                </div>
                <div className={ingredientOrderInfoStyles.ingPrice}>
                    <span className='text text_type_digits-default'>{ count }</span>
                    <span className='text text_type_digits-default'>X</span>
                    <span className='text text_type_digits-default'>
                        {ingInfo.price}
                    </span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        )
    )
}

export default IngredientOrderInfo;
