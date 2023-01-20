import {
    WS_USER_ORDERS_CLOSE,
    WS_USER_ORDERS_CONNECTING,
    WS_USER_ORDERS_ERROR,
    WS_USER_ORDERS_MESSAGE,
    WS_USER_ORDERS_OPEN,
} from '../actions/userOrders'
import { WebSocketStatus, TOrdersAll } from '../../utils/types/types';
import { TUserOrderActions } from '../actions/userOrders';

export type TInitialUserOrdersState = {
    status: WebSocketStatus,
    timeClosed: number | null,
    connectionError: string,
    orders: TOrdersAll[],
    total: number,
    totalToday: number
}

const initialOrdersState: TInitialUserOrdersState = {
    status: WebSocketStatus.OFFLINE,
    timeClosed: null,
    connectionError: '',
    orders: [],
    total: 0,
    totalToday: 0
};

export const wsUserReducer = (state = initialOrdersState, action: TUserOrderActions): TInitialUserOrdersState => {
    switch (action.type) {
        case WS_USER_ORDERS_CONNECTING:
            return {
                ...state,
                status: WebSocketStatus.CONNECTING
            };
        case WS_USER_ORDERS_OPEN:
            return {
                ...state,
                timeClosed: null,
                status: WebSocketStatus.ONLINE,
                connectionError: ''
            };
        case WS_USER_ORDERS_CLOSE:
            return {
                ...state,
                timeClosed: action.payload,
                status: WebSocketStatus.OFFLINE,
            };

        case WS_USER_ORDERS_ERROR:
            return {
                ...state,
                connectionError: action.payload,
            };
        case WS_USER_ORDERS_MESSAGE:
            const newOrders = action.payload.orders.reverse()
            return {
                ...state,
                orders: newOrders,
                total: action.payload.total,
                totalToday: action.payload.totalToday
            };
        default:
            return state;
    }
}; 
