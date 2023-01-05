import React from 'react';
import ordersStyles from './OrdersFeed.module.css';
import OrderItem from '../OrderItem/OrderItem'

const OrdersFeed = () => {

    return (
        <div className={ordersStyles.orders}>
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
        </div>
    )
}

export default OrdersFeed;
