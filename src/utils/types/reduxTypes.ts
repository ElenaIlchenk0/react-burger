import { TActions } from '../../services/actions/index';
import { TUserActions } from '../../services/actions/userInfo';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
import { rootReducer } from "../../services/reducers";
import { TOrderActions } from '../../services/actions/orders';
import { TUserOrderActions } from '../../services/actions/userOrders';

// import { configureStore, ThunkAction } from "@reduxjs/toolkit";
// import { combineReducers } from "redux";
// import {
//     TypedUseSelectorHook,
//     useDispatch as dispatchHook,
//     useSelector as selectorHook,
// } from "react-redux";

// import type { } from "redux-thunk/extend-redux";

export type RootState = ReturnType<typeof rootReducer>;

export type TAppActions = TActions | TUserActions | TOrderActions | TUserOrderActions;

export type AppThunk<TReturn = void> = ThunkAction<TReturn, RootState, never, TAppActions>;

export type AppDispatch = ThunkDispatch<RootState, never, TAppActions>;
export const useDispatch: () => AppDispatch = dispatchHook<AppDispatch>;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

// export type AppThunk<ReturnType = void> = ThunkAction<
//     ReturnType,
//     RootState,
//     unknown,
//     TAppActions
// >

// export type AppDispatch<TReturnType = void> = (
//     action: TAppActions | AppThunk<TReturnType>
//     ) => TReturnType;

// export const useDispatch: () => AppDispatch = dispatchHook;
// export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
