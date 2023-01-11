import React, { useEffect } from "react";
import { connect as ordersConnect, 
        disconnect as ordersDisconnect } 
    from "../../services/actions/orders";
import {
    connect as userOrdersConnect,
    disconnect as userOrdersDisconnect
}
    from "../../services/actions/userOrders";
import { ALL_ORDERS_FEED_URL } from "../constants";
import { useDispatch, useSelector } from "../types/reduxTypes";
import { WebSocketStatus } from "../types/types";

const data = {
    allOrders: {
        connect: ordersConnect,
        disconnect: ordersDisconnect,
        url: `${ALL_ORDERS_FEED_URL}/all`,
        reducer: 'wsReducer'
    },
    userOrders: {
        connect: userOrdersConnect,
        disconnect: userOrdersDisconnect,
        url: `${ALL_ORDERS_FEED_URL}?token=${localStorage.getItem('accessToken')}`,
        reducer: 'wsUserReducer'
    }
}

export const useWebsocket = (type: 'allOrders' | 'userOrders') => {
    const dispatch = useDispatch();
    const { orders, total, totalToday, status } = useSelector(state => state[data[type].reducer as 'wsReducer' | 'wsUserReducer']);
    const isDisconnected = status === WebSocketStatus.OFFLINE;

    useEffect(() => () => { dispatch(data[type].disconnect()) }, [data[type].disconnect])

    useEffect(() => {
        if (isDisconnected) {
            dispatch(data[type].connect(data[type].url))
        }
    }, [isDisconnected, data[type].connect, data[type].url])

    return {orders, total, totalToday}
}
