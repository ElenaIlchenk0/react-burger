import React, { useEffect, useState } from "react";
import {
    connect as ordersConnect,
    disconnect as ordersDisconnect
}
    from "../../services/actions/orders";
import {
    connect as userOrdersConnect,
    disconnect as userOrdersDisconnect
}
    from "../../services/actions/userOrders";
import { ALL_ORDERS_FEED_URL } from "../constants";
import { useDispatch, useSelector } from "../types/reduxTypes";
import { WebSocketStatus } from "../types/types";


export const useWebsocket = (type: 'allOrders' | 'userOrders', token?: string | null) => {
    const [data] = useState({
        allOrders: {
            connect: ordersConnect,
            disconnect: ordersDisconnect,
            url: `${ALL_ORDERS_FEED_URL}/all`,
            reducer: 'wsReducer'
        },
        userOrders: {
            connect: userOrdersConnect,
            disconnect: userOrdersDisconnect,
            url: `${ALL_ORDERS_FEED_URL}?token=${token}`,
            reducer: 'wsUserReducer'
        }
    })

    const dispatch = useDispatch();
    const { orders, total, totalToday, status, timeClosed } = useSelector(state => state[data[type].reducer as 'wsReducer' | 'wsUserReducer']);

    useEffect(() => () => {dispatch(data[type].disconnect());}, [data, type, dispatch])

    useEffect(() => {
        if (status === WebSocketStatus.OFFLINE) {
            if (!timeClosed || (timeClosed && (new Date().valueOf() - timeClosed) > 15000)) {
                console.log('was not closed or closed long ago')
                dispatch(data[type].connect(data[type].url))
            } else {
                console.log('closed recently, need timeout')
                var timer = setTimeout(() => dispatch(data[type].connect(data[type].url)), 15000)
            }
        }
        return () => clearTimeout(timer);
    }, [timeClosed, data, type, dispatch, status])

    return { orders, total, totalToday }
}
