import { SET_USER_DATA_SUCCESS, SET_USER_DATA_FAILED } from '../actions/userInfo'

export const initialUserState = {
    isAuthenticated: false,
    email: '',
    name: '',
    pass: '',
    isError: false,
    errMsg: ''
}

export const setUserReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case SET_USER_DATA_SUCCESS: {
            const pass = action.pass || state.pass
            return { 
                ...state,
                isAuthenticated: true,
                email: action.email,
                name: action.name,
                pass: pass,
                isError: false,
            };
        }
        case SET_USER_DATA_FAILED: {
             
            return {
                ...state,
                isAuthenticated: false,
                email: '',
                pass: '',
                name: '',
                isError: true,
                errMsg: action.msg
            };
        }

        default: {
            return state
        }
    }

}

