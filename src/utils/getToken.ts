import { BURGER_API_URL } from './constants';
import { request } from './fetchCheckResponse';
import { TRefreshToken } from './types/types'

export const getToken = (token: string) => {
    return request<TRefreshToken>(`${BURGER_API_URL}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "token": token
        })
    }).then(res => {
        if (res.success) {
            localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1]);
            localStorage.setItem('refreshToken', res.refreshToken);
        }
    }).catch(err => {
        throw new Error(JSON.stringify(err))
    })
}
