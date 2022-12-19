import {
    SET_USER_DATA_SUCCESS,
    SET_USER_DATA_FAILED,
    DEL_USER_DATA_SUCCESS,
    CHECK_USER,
    RESET_PASS,
    SET_NEW_PASS
} from '../actions/userInfo'

export const initialUserState = {
    authChecked: false,
    user: null,
    isError: false,
    errMsg: '',
    resetSent: false,
    resetDone: false
}

export const setUserReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case SET_USER_DATA_SUCCESS: {
            const pass = action.pass || state.user?.pass || '';
            return {
                ...state,
                user: {
                    ...state.user,
                    email: action.email,
                    name: action.name,
                    pass: pass,
                },
                isError: false,
                errMsg: '',
                resetSent: false,
                resetDone: false  
            };
        }
        case SET_USER_DATA_FAILED: {
            console.log('reducer failed')
            return {
                ...state,
                user: null,
                isError: true,
                errMsg: action.msg
            };
        }

        case DEL_USER_DATA_SUCCESS: {
            return {
                ...state,
                user: null,
                isError: false,
                errMsg: ''
            };
        }

        case CHECK_USER: {
            return {
                ...state,
                authChecked: true,
            }

        }

        case RESET_PASS: {
            return {
                ...state,
                resetSent: true,
                resetDone: false  
            }
        }

        case SET_NEW_PASS: {
            return {
                ...state,
                user: {
                    ...state.user,
                    pass: action.pass
                },
                resetSent: false,
                resetDone: true        
            }
        }

        default: {
            return state
        }
    }

}

