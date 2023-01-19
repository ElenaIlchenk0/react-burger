import React from 'react';
import { useWebsocket } from '../../utils/hooks/useWebsocket';
import OrdersFeed from '../OrdersFeed/OrdersFeed';


const OrderFeedWrapper = () => {
    
    const { orders } = useWebsocket('userOrders', localStorage.getItem('accessToken'));

    return <OrdersFeed orders={orders} />

}

export default OrderFeedWrapper;
