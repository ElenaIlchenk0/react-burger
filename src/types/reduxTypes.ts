import { TActions } from '../services/actions/index';
import { TUserActions } from '../services/actions/userInfo';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
import { rootReducer } from "../services/reducers"; 

export type RootState = ReturnType<typeof rootReducer>;

export type TAppActions = TActions | TUserActions

export type AppThunk<TReturn = void> = ThunkAction<TReturn, RootState, never, TAppActions>;

export type AppDispatch = ThunkDispatch<RootState, never, TAppActions>;
export const useDispatch: () => AppDispatch = dispatchHook<AppDispatch>;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
