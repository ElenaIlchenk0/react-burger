import React from 'react';
import { useWebsocket } from '../../utils/hooks/useWebsocket';
import OrdersFeed from '../OrdersFeed/OrdersFeed';


const OrderFeedWrapper = () => {
    const { orders } = useWebsocket('userOrders')

    return <OrdersFeed orders={orders}/>
    
}

export default OrderFeedWrapper;
