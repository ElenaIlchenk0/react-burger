import { WebSocketStatus } from '../../../utils/types/types'
import {
    wsConnecting,
    wsOpen,
    wsClose,
    wsError,
    wsMessage
} from '../../actions/orders'
import { wsReducer, initialOrdersState } from '../orders'

describe('wsReducer', () => {

    it('should return the initial state', () => {
        //@ts-ignore
        expect(wsReducer(undefined, {})).toEqual(initialOrdersState)
    })

    it('should change ws status to "connecting"', () => {

        expect(
            wsReducer(initialOrdersState, wsConnecting())
        ).toEqual({
            ...initialOrdersState,
            status: WebSocketStatus.CONNECTING
        })
    })

    it('should change ws status to "online" and clear error and timeClosed', () => {
        const newStore = {
            ...initialOrdersState, 
            timeClosed: 1674637738593,
            status: WebSocketStatus.ONLINE,
            connectionError: 'error'
        }
        expect(
            wsReducer(newStore, wsOpen())
        ).toEqual({
            ...newStore,
            timeClosed: null,
            status: WebSocketStatus.ONLINE,
            connectionError: ''
        })
    })

    it('should change ws status to "offline", set timeClosed', () => {
        const newStore = {
            ...initialOrdersState,
            imeClosed: null,
            status: WebSocketStatus.ONLINE,
        }
        expect(
            wsReducer(newStore, wsClose(1674637738593))
        ).toEqual({
            ...newStore,
            timeClosed: 1674637738593,
            status: WebSocketStatus.OFFLINE,
        })
    })

    it('should set connectionError', () => {
        expect(
            wsReducer(initialOrdersState, wsError('error'))
        ).toEqual({
            ...initialOrdersState,
            connectionError: 'error'
        })
    })

    it('should receive orders and qty of orders', () => {
        const data = {
            success: true,
            orders: [{
                ingredients: ['62666c42cc7b410027a1a9b6', '63666c42cc7b410027a1a9b7', '64666c42cc7b410027a1a9b8'],
                name: 'somename',
                number: 15,
                status: 'done',
                createdAt: 'string',
                updatedAt: 'string',
                _id: 'string678'
            }, {
                ingredients: ['60666c42cc7b410027a1a9b6', '60666c42cc7b410027a1a9b7', '60666c42cc7b410027a1a9b8'],
                name: 'name',
                number: 16,
                status: 'done',
                createdAt: 'string',
                updatedAt: 'string',
                _id: 'string123'
            }],
            total: 123,
            totalToday: 12,
        }
        expect(
            wsReducer(initialOrdersState, wsMessage(data))
        ).toEqual({
            ...initialOrdersState,
            orders: data.orders,
            total: data.total,
            totalToday: data.totalToday
        })
    })

}) 
