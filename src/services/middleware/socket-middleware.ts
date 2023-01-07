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
import { RootState } from '../../types/reduxTypes';
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';

// export type TwsActions = {
//     wsConnect: string;
//     wsDisconnect: string;
//     wsSendMessage?: string;
//     wsConnecting: string;
//     onOpen: string;
//     onClose: string;
//     onError: string;
//     onMessage: string;
// };

export type TwsActions = {
    wsConnect: ActionCreatorWithPayload<string>,
    wsDisconnect: ActionCreatorWithoutPayload,
    wsSendMessage?: ActionCreatorWithPayload<any>,
    wsConnecting: ActionCreatorWithoutPayload,
    onOpen: ActionCreatorWithoutPayload,
    onClose: ActionCreatorWithoutPayload,
    onError: ActionCreatorWithPayload<string>,
    onMessage: ActionCreatorWithPayload<any>,
}

export const socketMiddleware = (wsActions: TwsActions): Middleware<{}, RootState> => {
    return store => {
        let socket: WebSocket | null = null;

        return next => action => {
            const { dispatch } = store;
            const { wsConnect, wsSendMessage, onOpen, onClose, onError, onMessage, wsConnecting, wsDisconnect } = wsActions;

            if (wsConnect.match(action)) {
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

                if (wsDisconnect.match(action)) {
                    socket.close();
                    socket = null;
                    dispatch(wsDisconnect());
                }
            }

            next(action);
        };
    };
};
