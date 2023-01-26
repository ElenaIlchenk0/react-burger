import { TAllOrdersRes, TOrdersAll } from '../../utils/types/types'

export const ORDERS_CONNECT = 'ORDERS_CONNECT';
export const ORDERS_DISCONNECT = 'ORDERS_DISCONNECT';
export const WS_ORDERS_CONNECTING = 'WS_ORDERS_CONNECTING';
export const WS_ORDERS_OPEN = 'WS_ORDERS_OPEN';
export const WS_ORDERS_CLOSE = 'WS_ORDERS_CLOSE';
export const WS_ORDERS_MESSAGE = 'WS_ORDERS_MESSAGE';
export const WS_ORDERS_ERROR = 'WS_ORDERS_ERROR';

export interface IOrdersConnectAction {
    type: typeof ORDERS_CONNECT,
    payload: string //url
}
export interface IOrdersDisconnectAction {
    type: typeof ORDERS_DISCONNECT
}
export interface IOrdersConnectingAction {
    type: typeof WS_ORDERS_CONNECTING
}
export interface IOrdersOpenAction {
    type: typeof WS_ORDERS_OPEN
}
export interface IOrdersCloseAction {
    type: typeof WS_ORDERS_CLOSE,
    payload: number
}
export interface IOrdersMessageAction {
    type: typeof WS_ORDERS_MESSAGE,
    payload: TAllOrdersRes<TOrdersAll>
}
export interface IOrdersErrorAction {
    type: typeof WS_ORDERS_ERROR,
    payload: string
}

export type TOrderActions =
    | IOrdersConnectAction
    | IOrdersDisconnectAction
    | IOrdersConnectingAction
    | IOrdersOpenAction
    | IOrdersCloseAction
    | IOrdersMessageAction
    | IOrdersErrorAction;

export const connect = (url: string): IOrdersConnectAction => ({
    type: ORDERS_CONNECT,
    payload: url
})
export const disconnect = (): IOrdersDisconnectAction => ({
    type: ORDERS_DISCONNECT
})
export const wsConnecting = (): IOrdersConnectingAction => ({
    type: WS_ORDERS_CONNECTING
})
export const wsOpen = (): IOrdersOpenAction => ({
    type: WS_ORDERS_OPEN
})
export const wsClose = (date: number): IOrdersCloseAction => ({
    type: WS_ORDERS_CLOSE,
    payload: date
})
export const wsMessage = (response: TAllOrdersRes<TOrdersAll>): IOrdersMessageAction => ({
    type: WS_ORDERS_MESSAGE,
    payload: response
})
export const wsError = (err: string): IOrdersErrorAction => ({
    type: WS_ORDERS_ERROR,
    payload: err
})
