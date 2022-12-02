import { BURGER_API_URL } from '../../utils/constants';
import { request } from '../../utils/fetchCheckResponse';
import { getToken } from '../../utils/getToken';

export const SET_USER_DATA_SUCCESS = 'SET_USER_DATA_SUCCESS';
export const SET_USER_DATA_FAILED = 'SET_USER_DATA_FAILED';


export function registerUser(email, pass, name) {
    return function (dispatch) {
        request(`${BURGER_API_URL}/auth/register`, {
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
        }).catch(err => {
            dispatch({
                type: SET_USER_DATA_FAILED,
                msg: err.message
            })
        })
    }
}

export function loginUser(email, pass) {
    return function (dispatch) {
        request(`${BURGER_API_URL}/auth/login`, {
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
        }).catch(err => {
            dispatch({
                type: SET_USER_DATA_FAILED,
                msg: err.message
            })
        })
    }
}

export function getUser() {
    return function (dispatch) {
        request(`${BURGER_API_URL}/auth/user`, {
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
        }).catch((err) => {
            if (err.message === 'jwt expired') {
                const getUserAsync = async () => {
                    await getToken(localStorage.getItem('refreshToken'))
                    dispatch(getUser())
                }
                getUserAsync()
            } else {
                dispatch({
                    type: SET_USER_DATA_FAILED,
                    msg: err.message
                })
            }
        })
    }
}

export function patchUser(name, email, pass) {
    return function (dispatch) {
        request(`${BURGER_API_URL}/auth/user`, {
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
                console.log('patchUser success')
                dispatch({
                    type: SET_USER_DATA_SUCCESS,
                    email: res.user.email,
                    name: res.user.name,
                    pass: pass
                })
            }
        }).catch((err) => {
            if (err.message === 'jwt expired') {
                const getUserAsync = async () => {
                    await getToken(localStorage.getItem('refreshToken'))
                    dispatch(patchUser())
                }
                getUserAsync()
            } else {
                dispatch({
                    type: SET_USER_DATA_FAILED,
                    msg: err.message
                })
            }
        })
    }
}



