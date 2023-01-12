import { BURGER_API_URL } from './constants';
import { request } from './fetchCheckResponse';
import { TAllOrdersRes, TOrdersAll } from './types/types'

export const getOrderInfo = (orderNum: string) => {
    return request<TAllOrdersRes<TOrdersAll>>(`${BURGER_API_URL}/orders/${orderNum}`)
    .then(res => {
        if (res.success) return res
    }).catch(err => {
        Promise.reject(err)
    })
}
