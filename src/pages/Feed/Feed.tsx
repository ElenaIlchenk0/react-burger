import React, { useEffect, useState } from 'react';
import feedStyles from './Feed.module.css';
import OrdersFeed from '../../components/OrdersFeed/OrdersFeed';

import { useWebsocket } from '../../utils/hooks/useWebsocket';

const Feed = () => {
    const { orders, total, totalToday } = useWebsocket('allOrders')

    const [stateOrders, setStateOrders] = useState<{ doneOrders: number[], progressOrders: number[] }>({ doneOrders: [], progressOrders: [] })

    useEffect(() => {

        const newOrders: { doneOrders: number[], progressOrders: number[] } = { doneOrders: [], progressOrders: [] }

        orders.forEach((order, i) => {
            if (order.status === 'done') {
                newOrders.doneOrders.push(order.number)
            } else if (order.status === 'pending') {
                newOrders.progressOrders.push(order.number)
            }
        })

        setStateOrders(newOrders)
    }, [orders])

    return (
        <>
            <div className={`${feedStyles.ordersWrapper} pt-10`}>
                <h1 className={feedStyles.title}>Лента заказов</h1>
                <div style={{height: 'calc(100vh - 260px)'}}>
                    <OrdersFeed orders={orders} />
                </div>
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
