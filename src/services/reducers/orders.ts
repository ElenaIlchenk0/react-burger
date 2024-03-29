import {
    WS_ORDERS_CLOSE,
    WS_ORDERS_CONNECTING,
    WS_ORDERS_ERROR,
    WS_ORDERS_MESSAGE,
    WS_ORDERS_OPEN,
} from '../actions/orders'
import { WebSocketStatus, TOrdersAll } from '../../utils/types/types';
import { TOrderActions } from '../actions/orders';

export type TInitialOrdersState = {
    status: WebSocketStatus,
    timeClosed: number | null,
    connectionError: string,
    orders: TOrdersAll[],
    total: number,
    totalToday: number
}

export const initialOrdersState: TInitialOrdersState = {
    status: WebSocketStatus.OFFLINE,
    timeClosed: null,
    connectionError: '',
    orders: [],
    total: 0,
    totalToday: 0
};

export const wsReducer = (state = initialOrdersState, action: TOrderActions): TInitialOrdersState => {
    switch (action.type) {
        case WS_ORDERS_CONNECTING:
            return {
                ...state,
                status: WebSocketStatus.CONNECTING
            };
        case WS_ORDERS_OPEN:
            return {
                ...state,
                timeClosed: null,
                status: WebSocketStatus.ONLINE,
                connectionError: ''
            };
        case WS_ORDERS_CLOSE:
            return {
                ...state,
                timeClosed: action.payload,
                status: WebSocketStatus.OFFLINE,
            };

        case WS_ORDERS_ERROR:
            return {
                ...state,
                connectionError: action.payload,
            };
        case WS_ORDERS_MESSAGE:
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday
            };
        default:
            return state;
    }
}; 
