import React from 'react';
import orderItemStyles from './OrderItem.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { TModalState, TOrdersAll } from '../../utils/types/types';
import { useSelector } from '../../utils/types/reduxTypes';
import { ingredientsTotalPrice } from '../../utils/ingredientsTotalPrice';

interface IOrderItem {
    order: TOrdersAll
}

const OrderItem: React.FC<IOrderItem> = ({ order }) => {
    const location = useLocation();
    const { path } = useRouteMatch();

    const { ingredients } = useSelector(store => store.ingredientsReducer);
    const orderIngredients = ingredients.filter((ing) => order.ingredients.includes(ing._id));
    const totalPrice = ingredientsTotalPrice(order.ingredients, orderIngredients);

    return (
        <Link<TModalState>
            className={orderItemStyles.link}
            key={order._id}
            to={{
                pathname: `${path}/${order.number}`,
                state: { background: location },
            }}
        >
            <div className={orderItemStyles.wrapper}>
                <div className={orderItemStyles.headerInfo}>
                    <div className={`${orderItemStyles.orderNumber} text text_type_digits-default`}>
                        {`#${order.number}`}
                    </div>
                    <div className={`${orderItemStyles.orderDate} text_color_inactive`}>
                        <FormattedDate date={new Date(order.createdAt)} />
                    </div>
                </div>
                <div className={`${orderItemStyles.burgerName} text text_type_main-medium`}>
                    {order.name}
                </div>
                <div className={orderItemStyles.burgerInfo}>
                    <div className={orderItemStyles.burgerIngredients}>
                        {
                            orderIngredients.slice(0, 5).map((ing, i) => (
                                <div key={i} className={orderItemStyles.ingImage}>
                                    <img src={ing.image_mobile} alt='ingredient'></img>
                                </div>
                            )
                            )
                        }
                        {
                            orderIngredients.slice(5).length ? (
                                <div className={orderItemStyles.ingImage}>
                                    <span className='text text_type_main-default'>{`+${orderIngredients.slice(5).length}`}</span>
                                    <img src={orderIngredients[5].image_mobile} alt='ingredient'></img>
                                </div>
                            ) : null
                        }
                    </div>
                    <div className={orderItemStyles.burgerPrice}>
                        <span className='text text_type_digits-default'>
                            {totalPrice}
                        </span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default OrderItem;
