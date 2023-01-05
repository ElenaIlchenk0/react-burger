import React from 'react';
import feedStyles from './Feed.module.css';
import OrdersFeed from '../../components/OrdersFeed/OrdersFeed'

const Feed = () => {

    return (
        <>
            <div className={`${feedStyles.ordersWrapper} pt-10`}>
                <h1 className={feedStyles.title}>Лента заказов</h1>
                <OrdersFeed />
            </div>
            <div className={`${feedStyles.sectionWrapper} pt-25`}>
                <div className={feedStyles.section}>
                    <div className={feedStyles.lastOrders}>
                        <div className={feedStyles.done}>
                            <span className='text text_type_main-medium'>Готовы:</span>
                            <div className={feedStyles.ordersNumbersWrapper}>
                                <div className={`${feedStyles.ordersDone} text text_type_digits-default pt-3`}>
                                    <span>034533</span>
                                    <span>034533</span>
                                    <span>034533</span>
                                    <span>034533</span>
                                    <span>034533</span>
                                    <span>034533</span>
                                    <span>034533</span>
                                    <span>034533</span>
                                </div>
                            </div>
                        </div>
                        <div className={feedStyles.progress}>
                            <span className='text text_type_main-medium'>В работе:</span>
                            <div className={feedStyles.ordersNumbersWrapper}>
                                <div className={`${feedStyles.ordersInProgress} text text_type_digits-default pt-3`}>
                                    <span>034533</span>
                                    <span>034533</span>
                                    <span>034533</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={feedStyles.section}>
                    <span className='text text_type_main-medium'>Выполнено за все время:</span>
                    <span className='text text_type_digits-large'>28752</span>
                </div>
                <div className={feedStyles.section}>
                    <span className='text text_type_main-medium'>Выполнено за сегодня:</span>
                    <span className='text text_type_digits-large'>138</span>
                </div>
            </div>
        </>
    )
}

export default Feed;
