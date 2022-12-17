import { BURGER_API_URL } from './constants';
import { request } from './fetchCheckResponse';

type TToken = {
    "success": boolean,
    "accessToken": string,
    "refreshToken": string
} 

export const getToken = (token: string) => {
    return request<TToken>(`${BURGER_API_URL}/auth/token`, {
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
        Promise.reject(err)
    })
}
