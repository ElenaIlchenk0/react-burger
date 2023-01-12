import React, { useEffect, useState } from 'react';
import orderInfoStyles from './OrderInfo.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientOrderInfo from '../IngredientOrderInfo/IngredientOrderInfo'
import { useParams } from 'react-router-dom';
import { useSelector } from '../../utils/types/reduxTypes';
import { TIngredientData, TOrdersAll } from '../../utils/types/types';
import { ingredientsTotalPrice } from '../../utils/ingredientsTotalPrice';
import { getOrderInfo } from '../../utils/getOrderInfo';
import { countIngredients } from '../../utils/countIngredients';


const OrderInfo = () => {
    const { orderNum } = useParams<{ orderNum?: string }>();

    const [order, setOrder] = useState<TOrdersAll | null>(null);
    const [orderIngredients, setOrderIngredients] = useState<TIngredientData[] | null>(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [countIng, setCountIng] = useState<{[key: string]: number} | null>(null);

    const { ingredients } = useSelector(store => store.ingredientsReducer);

    useEffect(() => {
        const orderFetch = async () => {
            if (orderNum) {
                let orderInfo = await getOrderInfo(orderNum);
                orderInfo && setOrder(orderInfo.orders[0])
            }
        }
        orderFetch()
    }, [orderNum])

    useEffect(() => {
        if (order) {
            const orderIngredients = ingredients.filter((ing) => order.ingredients.includes(ing._id));
            setOrderIngredients(orderIngredients);
            setCountIng(countIngredients(order.ingredients));
            setTotalPrice(ingredientsTotalPrice(order.ingredients, orderIngredients));
        }
    }, [order, ingredients])

    return (
         order && (
            <div className={orderInfoStyles.wrapper}>
                    <h1 className='text text_type_digits-default'>{`#${order.number}`}</h1>
                    <p className='text text_type_main-medium mt-5 mb-2'>{order.name}</p>
                    <span className={orderInfoStyles.status}>{order.status}</span>
                <div className='mt-8'>
                    <h2 className='mt-2 mb-4'>Состав:</h2>
                    <div className={orderInfoStyles.filling}>
                        {
                            orderIngredients && countIng && Object.keys(countIng).map((id, i) => {
                                const ingInfo = orderIngredients.find((el) => el._id === id)
                                return <IngredientOrderInfo 
                                        key={i}
                                        count={countIng[id]}
                                        ingInfo={ingInfo ? ingInfo : null}
                                    />
                            })
                        }
                    </div>
                </div>
                <div className={orderInfoStyles.info}>
                    <div className='text_color_inactive'>
                            <FormattedDate date={new Date(order.createdAt)} />
                    </div>
                    <div className={orderInfoStyles.burgerPrice}>
                        <span className='text text_type_digits-default'>
                            { totalPrice }
                        </span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        )
    )
}

export default OrderInfo;
