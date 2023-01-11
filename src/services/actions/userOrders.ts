import { TAllOrdersRes, TOrdersAll } from '../../utils/types/types'

export const USER_ORDERS_CONNECT = 'USER_ORDERS_CONNECT';
export const USER_ORDERS_DISCONNECT = 'USER_ORDERS_DISCONNECT';
export const WS_USER_ORDERS_CONNECTING = 'WS_USER_ORDERS_CONNECTING';
export const WS_USER_ORDERS_OPEN = 'WS_USER_ORDERS_OPEN';
export const WS_USER_ORDERS_CLOSE = 'WS_USER_ORDERS_CLOSE';
export const WS_USER_ORDERS_MESSAGE = 'WS_USER_ORDERS_MESSAGE';
export const WS_USER_ORDERS_ERROR = 'WS_ORDERS_ERROR';

export interface IUserOrdersConnectAction {
    type: typeof USER_ORDERS_CONNECT,
    payload: string //url
}
export interface IUserOrdersDisconnectAction {
    type: typeof USER_ORDERS_DISCONNECT
}
export interface IUserOrdersConnectingAction {
    type: typeof WS_USER_ORDERS_CONNECTING
}
export interface IUserOrdersOpenAction {
    type: typeof WS_USER_ORDERS_OPEN
}
export interface IUserOrdersCloseAction {
    type: typeof WS_USER_ORDERS_CLOSE
}
export interface IUserOrdersMessageAction {
    type: typeof WS_USER_ORDERS_MESSAGE,
    payload: TAllOrdersRes<TOrdersAll>
}
export interface IUserOrdersErrorAction {
    type: typeof WS_USER_ORDERS_ERROR,
    payload: string
}

export type TUserOrderActions =
    | IUserOrdersConnectAction
    | IUserOrdersDisconnectAction
    | IUserOrdersConnectingAction
    | IUserOrdersOpenAction
    | IUserOrdersCloseAction
    | IUserOrdersMessageAction
    | IUserOrdersErrorAction;

export const connect = (url: string): IUserOrdersConnectAction => ({
    type: USER_ORDERS_CONNECT,
    payload: url
})
export const disconnect = (): IUserOrdersDisconnectAction => ({
    type: USER_ORDERS_DISCONNECT
})
export const wsConnecting = (): IUserOrdersConnectingAction => ({
    type: WS_USER_ORDERS_CONNECTING
})
export const wsOpen = (): IUserOrdersOpenAction => ({
    type: WS_USER_ORDERS_OPEN
})
export const wsClose = (): IUserOrdersCloseAction => ({
    type: WS_USER_ORDERS_CLOSE
})
export const wsMessage = (response: TAllOrdersRes<TOrdersAll>): IUserOrdersMessageAction => ({
    type: WS_USER_ORDERS_MESSAGE,
    payload: response
})
export const wsError = (err: string): IUserOrdersErrorAction => ({
    type: WS_USER_ORDERS_ERROR,
    payload: err
})
