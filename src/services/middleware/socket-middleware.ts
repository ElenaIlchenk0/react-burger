import { Middleware } from 'redux';
import { getToken } from '../../utils/getToken';
import { RootState } from '../../utils/types/reduxTypes';
import {
    connect as connectAllOrders,
    disconnect as disconnectAllOrders,
    wsConnecting as connectingAllOrders,
    wsOpen as openAllOrders,
    wsClose as closeAllOrders,
    wsMessage as messageAllOrders,
    wsError as errorAllOrders
} from "../actions/orders";
import {
    connect as connectUserOrders,
    disconnect as disconnectUserOrders,
    wsConnecting as connectingUserOrders,
    wsOpen as openUserOrders,
    wsClose as closeUserOrders,
    wsMessage as messageUserOrders,
    wsError as errorUserOrders
} from "../actions/userOrders";

export type TwsActions = {
    wsConnect: typeof connectAllOrders | typeof connectUserOrders,
    wsDisconnect: typeof disconnectAllOrders | typeof disconnectUserOrders,
    wsConnecting: typeof connectingAllOrders | typeof connectingUserOrders,
    onOpen: typeof openAllOrders | typeof openUserOrders,
    onClose: typeof closeAllOrders | typeof closeUserOrders,
    onError: typeof errorAllOrders | typeof errorUserOrders,
    onMessage: typeof messageAllOrders | typeof messageUserOrders,
    wsSendMessage?: any
}

export const socketMiddleware = (wsActions: TwsActions): Middleware<{}, RootState> => {
    return store => {
        let socket: WebSocket | null = null;

        return next => action => {
            const { dispatch } = store;
            const { wsConnect, wsSendMessage, onOpen, onClose, onError, onMessage, wsConnecting, wsDisconnect } = wsActions;

            const { type: connectType } = wsConnect('');
            const { type: disconnectType } = wsDisconnect();

            if (action.type === connectType) {
                socket = new WebSocket(action.payload);
                dispatch(wsConnecting());
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
                    if (parsedData.message === 'Invalid or missing token') {
                        console.log('Invalid or missing token')

                        const tk = localStorage.getItem('refreshToken');
                        if (tk) getToken(tk)
                    } else {
                        dispatch(onMessage(parsedData));
                    }
                    // dispatch(onMessage(parsedData));
                };

                socket.onclose = event => {
                    dispatch(onClose(new Date().valueOf()));
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
