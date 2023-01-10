import React, { useEffect, useState } from 'react';
import feedStyles from './Feed.module.css';
import OrdersFeed from '../../components/OrdersFeed/OrdersFeed';

import { useDispatch, useSelector } from '../../utils/types/reduxTypes';
import { connect, disconnect } from '../../services/actions/orders';
import { WebSocketStatus } from '../../utils/types/types';

import { ALL_ORDERS_FEED_URL } from '../../utils/constants';

const Feed = () => {
    const dispatch = useDispatch();
    const { orders, total, totalToday, status } = useSelector(state => state.wsReducer);
    const isDisconnected = status === WebSocketStatus.OFFLINE;

    const [stateOrders, setStateOrders] = useState<{ doneOrders: number[], progressOrders: number[] }>({ doneOrders: [], progressOrders: [] })

    useEffect(() => () => { dispatch(disconnect()) }, [])

    useEffect(() => {
        if (isDisconnected) {
            dispatch(connect(ALL_ORDERS_FEED_URL))
        }
    }, [dispatch, isDisconnected])

    useEffect(() => {

        const newOrders: { doneOrders: number[], progressOrders: number[] } = { doneOrders: [], progressOrders: [] }

        orders.forEach((order, i) => {
            if (order.status === 'done') {
                newOrders.doneOrders.push(order.number)
            } else newOrders.progressOrders.push(order.number)
        })

        setStateOrders(newOrders)
    }, [orders])

    return (
        <>
            <div className={`${feedStyles.ordersWrapper} pt-10`}>
                <h1 className={feedStyles.title}>Лента заказов</h1>
                <OrdersFeed orders={orders} />
            </div>
            <div className={`${feedStyles.sectionWrapper} pt-25`}>
                <div className={feedStyles.section}>
                    <div className={feedStyles.lastOrders}>
                        <div className={feedStyles.done}>
                            <span className='text text_type_main-medium'>Готовы:</span>
                            <div className={feedStyles.ordersNumbersWrapper}>
                                <div className={`${feedStyles.ordersDone} text text_type_digits-default pt-3`}>
                                    {
                                        stateOrders.doneOrders.length > 0 && stateOrders.doneOrders.slice(0, 10).map((num, i) => <span key={i}>{num}</span>)
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={feedStyles.progress}>
                            <span className='text text_type_main-medium'>В работе:</span>
                            <div className={feedStyles.ordersNumbersWrapper}>
                                <div className={`${feedStyles.ordersInProgress} text text_type_digits-default pt-3`}>
                                    {
                                        stateOrders.progressOrders.length > 0 && stateOrders.progressOrders.slice(0, 10).map((num, i) => <span key={i}>{num}</span>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={feedStyles.section}>
                    <span className='text text_type_main-medium'>Выполнено за все время:</span>
                    <span className='text text_type_digits-large'>{total}</span>
                </div>
                <div className={feedStyles.section}>
                    <span className='text text_type_main-medium'>Выполнено за сегодня:</span>
                    <span className='text text_type_digits-large'>{totalToday}</span>
                </div>
            </div>
        </>
    )
}

export default Feed;
