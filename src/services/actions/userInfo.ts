import { BURGER_API_URL } from '../../utils/constants';
import { request } from '../../utils/fetchCheckResponse';
import { getToken } from '../../utils/getToken';
import {
    TError,
    TUser,
    TLogRegResponse,
    TAuthUser,
    TPlainResponse,
    AppThunk,
    AppDispatch
} from '../../types/types'


export const SET_USER_DATA_SUCCESS: 'SET_USER_DATA_SUCCESS' = 'SET_USER_DATA_SUCCESS';
export const SET_USER_DATA_FAILED: 'SET_USER_DATA_FAILED' = 'SET_USER_DATA_FAILED';
export const DEL_USER_DATA_SUCCESS: 'DEL_USER_DATA_SUCCESS' = 'DEL_USER_DATA_SUCCESS';
export const CHECK_USER: 'CHECK_USER' = 'CHECK_USER';
export const RESET_PASS: 'RESET_PASS' = 'RESET_PASS';
export const SET_NEW_PASS: 'SET_NEW_PASS' = 'SET_NEW_PASS';

// Типизация экшенов
export interface ISetUserDataSuccessAction {
    readonly type: typeof SET_USER_DATA_SUCCESS;
    readonly email: string;
    readonly name: string;
    readonly pass?: string;
}

export interface ISetUserDataFailedAction {
    readonly type: typeof SET_USER_DATA_FAILED;
    readonly msg?: string;
}

export interface IDelUserDataSuccessAction {
    readonly type: typeof DEL_USER_DATA_SUCCESS;
}

export interface ICheckUserAction {
    readonly type: typeof CHECK_USER;
}

export interface IResetPassAction {
    readonly type: typeof RESET_PASS;
}

export interface ISetNewPassAction {
    readonly type: typeof SET_NEW_PASS;
}

// Union тип
export type TUserActions =
    | ISetUserDataSuccessAction
    | ISetUserDataFailedAction
    | ICheckUserAction
    | IDelUserDataSuccessAction
    | IResetPassAction
    | ISetNewPassAction;

// Генераторы
const setUserDataSuccess = ({ email, pass, name }: TUser): ISetUserDataSuccessAction => ({
    type: SET_USER_DATA_SUCCESS,
    email,
    name,
    pass,
});

const setUserDataFailed = (msg: string): ISetUserDataFailedAction => ({
    type: SET_USER_DATA_FAILED,
    msg 
});

const delUserDataSuccess = (): IDelUserDataSuccessAction => ({
    type: DEL_USER_DATA_SUCCESS
});

export const checkUser = (): ICheckUserAction => ({
    type: CHECK_USER
});

const resetPassword = (): IResetPassAction => ({
    type: RESET_PASS
});

const setNewPassword = (): ISetNewPassAction => ({
    type: SET_NEW_PASS
});

// api middlewares
export const registerUser = ({ email, pass, name }: TUser): AppThunk => (dispatch: AppDispatch) => {
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

            dispatch(setUserDataSuccess({ email: res.user.email, name: res.user.name, pass}))
        }
    }).catch((err: TError) => {
        dispatch(setUserDataFailed(err.message))
    })
}


export const loginUser = ({ email, pass }: TUser): AppThunk => (dispatch: AppDispatch) => {
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

            dispatch(setUserDataSuccess({ email: res.user.email, name: res.user.name, pass }))
        }
    }).catch((err: TError) => {
        dispatch(setUserDataFailed(err.message))
    })
}


export const getUser = (): AppThunk<Promise<void>> => (dispatch: AppDispatch) => {
    return request<TAuthUser>(`${BURGER_API_URL}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.success) {
            dispatch(setUserDataSuccess({ email: res.user.email, name: res.user.name, pass: '' }))
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
                dispatch(setUserDataFailed(err.message))
            }
        } else {
            dispatch(setUserDataFailed(err.message))
        }
    })
}


export const patchUser = ({ name, email, pass }: TUser): AppThunk => (dispatch: AppDispatch) => {
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
            dispatch(setUserDataSuccess({ email: res.user.email, name: res.user.name, pass }))
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
                dispatch(setUserDataFailed(err.message))
            }

        } else {
            dispatch(setUserDataFailed(err.message))
        }
    })
}

export const logoutUser = (): AppThunk => (dispatch: AppDispatch) => {
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
            dispatch(delUserDataSuccess())
        }
    }).catch((err: TError) => {
        dispatch(setUserDataFailed(err.message))
    })
}


export const resetPass = ({ email }: TUser): AppThunk => (dispatch: AppDispatch) => {
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
            dispatch(resetPassword())
        }
    }).catch((err: TError) => Promise.reject(err))
}

export const provideNewPass = ({ pass, token }: TUser & { token: string }): AppThunk => (dispatch: AppDispatch) => {
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
            dispatch(setNewPassword())
        }
    }).catch((err: TError) => Promise.reject(err))
}


