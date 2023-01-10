import { TOrderActions } from '../actions/orders';
import {
    connect,
    disconnect,
    wsConnecting,
    wsOpen,
    wsClose,
    wsMessage,
    wsError
} from '../actions/orders'
import { Middleware } from 'redux';
import { RootState } from '../../utils/types/reduxTypes';
// import {
//     connect as AllOrdersWsConnect,
//     disconnect as AllOrdersWsDisconnect,
//     wsConnecting as AllOrdersWsConnecting,
//     wsOpen as AllOrdersWsOpen,
//     wsClose as AllOrdersWsClose,
//     wsMessage as AllOrdersWsMessage,
//     wsError as AllOrdersWsError
// } from "../actions/orders";

export type TwsActions = {
    wsConnect: typeof connect,
    wsDisconnect: typeof disconnect,
    wsConnecting: typeof wsConnecting,
    onOpen: typeof wsOpen,
    onClose: typeof wsClose,
    onError: typeof wsError,
    onMessage: typeof wsMessage,
    wsSendMessage?: any
}

export const socketMiddleware = (wsActions: TwsActions): Middleware<{}, RootState> => {
    return store => {
        let socket: WebSocket | null = null;

        return next => action => {
            const { dispatch } = store;
            const { wsConnect, wsSendMessage, onOpen, onClose, onError, onMessage, wsConnecting, wsDisconnect } = wsActions;

            const { type: connectType } = wsConnect('')
            const { type: disconnectType } = wsDisconnect()



            if (action.type === connectType) {
                socket = new WebSocket(action.payload);
                dispatch(wsConnecting())
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch(onOpen());
                };

                socket.onerror = event => {
                    dispatch(onError('Error'));
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);

                    dispatch(onMessage(parsedData));
                };

                socket.onclose = event => {
                    dispatch(onClose());
                };

                if (wsSendMessage?.match(action)) {
                    socket.send(JSON.stringify(action.payload));
                }

                if (action.type === disconnectType) {
                    socket.close();
                    socket = null;
                }
            }

            next(action);
        };
    };
};
