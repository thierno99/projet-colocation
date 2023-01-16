import { configureStore, MiddlewareArray } from '@reduxjs/toolkit';
import {  combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { advertiseAccommodationReducer } from './reducers/advertise-accommodation-reducer';

const rootReducer = combineReducers({
    advertiseAccommodation: advertiseAccommodationReducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: new MiddlewareArray().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

