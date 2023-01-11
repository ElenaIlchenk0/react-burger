import React, { useEffect } from 'react';
import ordersStyles from './OrdersFeed.module.css';
import OrderItem from '../OrderItem/OrderItem'
import { TOrdersAll } from '../../utils/types/types';

interface IOrdersFeed {
    orders: TOrdersAll[]
}

const OrdersFeed: React.FC<IOrdersFeed> = ({ orders }) => {

    return (
        <div className={ordersStyles.orders}>
            {
                orders.map((order, i) => <OrderItem key={i} order={order} />)
            }
        </div>
    )
}

export default OrdersFeed;
