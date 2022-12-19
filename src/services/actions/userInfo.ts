import { BURGER_API_URL } from '../../utils/constants';
import { request } from '../../utils/fetchCheckResponse';
import { getToken } from '../../utils/getToken';
import {
    TError,
    TUser,
    TLogRegResponse,
    TAuthUser,
    TPlainResponse
} from '../../types/types'

export const SET_USER_DATA_SUCCESS = 'SET_USER_DATA_SUCCESS';
export const SET_USER_DATA_FAILED = 'SET_USER_DATA_FAILED';
export const DEL_USER_DATA_SUCCESS = 'DEL_USER_DATA_SUCCESS';
export const CHECK_USER = 'CHECK_USER';
export const RESET_PASS = 'RESET_PASS';
export const SET_NEW_PASS = 'SET_NEW_PASS';


export function registerUser({ email, pass, name }: TUser) {
    return function (dispatch: any) {
        request<TLogRegResponse>(`${BURGER_API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "email": email,
                "password": pass,
                "name": name
            })
        }).then(res => {
            if (res.success) {

                localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1]);
                localStorage.setItem('refreshToken', res.refreshToken);

                dispatch({
                    type: SET_USER_DATA_SUCCESS,
                    email: res.user.email,
                    name: res.user.name,
                    pass: pass
                })
            }
        }).catch((err: TError) => {
            dispatch({
                type: SET_USER_DATA_FAILED,
                msg: err.message
            })
        })
    }
}

export function loginUser({ email, pass }: TUser) {
    return function (dispatch: any) {
        request<TLogRegResponse>(`${BURGER_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "email": email,
                "password": pass
            })
        }).then(res => {
            if (res.success) {

                localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1]);
                localStorage.setItem('refreshToken', res.refreshToken);

                dispatch({
                    type: SET_USER_DATA_SUCCESS,
                    email: res.user.email,
                    name: res.user.name,
                    pass: pass
                })
            }
        }).catch((err: TError) => {
            dispatch({
                type: SET_USER_DATA_FAILED,
                msg: err.message
            })
        })
    }
}

export function getUser() {
    return function (dispatch: any) {
        return request<TAuthUser>(`${BURGER_API_URL}/auth/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => {
            if (res.success) {
                dispatch({
                    type: SET_USER_DATA_SUCCESS,
                    email: res.user.email,
                    name: res.user.name
                })
            }
        }).catch((err: TError) => {
            if (err.message === 'jwt expired') {
                const tk = localStorage.getItem('refreshToken');
                if (tk) {
                    const getUserAsync = async () => {
                        getToken(tk).then(() => {
                            dispatch(getUser())
                        }).catch((e) => console.log(e))
                    }
                    getUserAsync()
                } else {
                    dispatch({
                        type: SET_USER_DATA_FAILED
                    })
                }
            } else {
                dispatch({
                    type: SET_USER_DATA_FAILED
                })
            }
        })
    }
}

export function patchUser({ name, email, pass }: TUser) {
    return function (dispatch: any) {
        request<TAuthUser>(`${BURGER_API_URL}/auth/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                "email": email,
                "password": pass,
                "name": name
            })
        }).then(res => {
            if (res.success) {
                dispatch({
                    type: SET_USER_DATA_SUCCESS,
                    email: res.user.email,
                    name: res.user.name,
                    pass: pass
                })
            }
        }).catch((err: TError) => {
            if (err.message === 'jwt expired') {
                const tk = localStorage.getItem('refreshToken');
                if (tk) {
                    const getUserAsync = async () => {
                        getToken(tk).then(() => {
                            dispatch(patchUser({ name, email, pass }))
                        }).catch((e) => console.log(e))
                    }
                    getUserAsync()
                } else {
                    dispatch({
                        type: SET_USER_DATA_FAILED,
                        msg: err.message
                    })
                }

            } else {
                dispatch({
                    type: SET_USER_DATA_FAILED,
                    msg: err.message
                })
            }
        })
    }
}

export function logoutUser() {
    return function (dispatch: any) {
        request<TPlainResponse>(`${BURGER_API_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "token": localStorage.getItem('refreshToken')
            })
        }).then(res => {
            if (res.success) {
                localStorage.removeItem('accessToken');
                dispatch({
                    type: DEL_USER_DATA_SUCCESS
                })
            }
        }).catch((err: TError) => {
            dispatch({
                type: SET_USER_DATA_FAILED,
                msg: err.message
            })
        })
    }
}

export function resetPass({email}: TUser) {
    return function (dispatch: any) {
        request<TPlainResponse>(`${BURGER_API_URL}/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "email": email
            })
        }).then(res => {
            if (res.success) {
                dispatch({
                    type: RESET_PASS,
                    resetSent: true
                })
            }
        }).catch((err: TError) => Promise.reject(err))
    }
}

export function provideNewPass({pass, token}: TUser & {token: string}) {
    return function (dispatch: any) {
        request<TPlainResponse>(`${BURGER_API_URL}/password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "password": pass,
                "token": token
            })
        }).then(res => {
            if (res.success) {
                dispatch({
                    type: SET_NEW_PASS
                })
            }
        }).catch((err: TError) => Promise.reject(err))
    }
}


