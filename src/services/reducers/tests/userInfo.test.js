import {
    setUserDataSuccess,
    setUserDataFailed,
    delUserDataSuccess,
    checkUser,
    resetPassword,
    setNewPassword
} from '../../actions/userInfo'
import { setUserReducer, initialUserState } from '../userInfo'

describe('SetUserReducer', () => {

    it('should return the initial state', () => {
        //@ts-ignore
        expect(setUserReducer(undefined, {})).toEqual(initialUserState)
    })

    it('should set user data to store', () => {
        
        expect(
            setUserReducer(initialUserState, setUserDataSuccess({ email: 'email', pass: 'pass', name: 'name' }))
        ).toEqual({
            ...initialUserState,
            user: {
                ...initialUserState.user,
                email: 'email',
                name: 'name',
                pass: 'pass',
            },
            isError: false,
            errMsg: ''
        })
    })

    it('should return state without user data and set error', () => {
        const newStore = {
            ...initialUserState, user: {
                ...initialUserState.user,
                email: 'email',
                name: 'name',
                pass: 'pass',
            }
        }
        expect(
            setUserReducer(newStore, setUserDataFailed('error'))
        ).toEqual({
            ...newStore,
            user: null,
            isError: true,
            errMsg: 'error'
        })
    })

    it('should handle logout: return state without user data and set error false', () => {
        const newStore = {
            ...initialUserState, 
            user: {
                ...initialUserState.user,
                email: 'email',
                name: 'name',
                pass: 'pass',
            },
            isError: true,
            errMsg: 'error'
        }
        expect(
            setUserReducer(newStore, delUserDataSuccess())
        ).toEqual({
            ...newStore,
            user: null,
            isError: false,
            errMsg: ''
        })
    })

    it('should set authChecked: true', () => {
        expect(
            setUserReducer(initialUserState, checkUser())
        ).toEqual({
            ...initialUserState,
            authChecked: true
        })
    })

    it('should reset Password', () => {
        expect(
            setUserReducer(initialUserState, resetPassword())
        ).toEqual({
            ...initialUserState,
            resetSent: true,
            resetDone: false
        })
    })

    it('should set new Password', () => {
        expect(
            setUserReducer(initialUserState, setNewPassword())
        ).toEqual({
            ...initialUserState,
            resetSent: false,
            resetDone: true
        })
    })
    
}) 
