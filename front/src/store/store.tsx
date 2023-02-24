import { configureStore, MiddlewareArray } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {  AnyAction, combineReducers } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { advertiseAccommodationReducer } from './reducers/advertise-accommodation-reducer';
import { AnnounceLocationListReducer, AnnouncementsBetweenReducer, productDetailsReducer } from './reducers/announce-reducer';


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

const rootReducer = combineReducers({
    announceLocationList: AnnounceLocationListReducer,
    announcementDetail: productDetailsReducer,
    advertiseAccommodation: advertiseAccommodationReducer,
    AnnouncementsBetween: AnnouncementsBetweenReducer

});

const store = configureStore({
    reducer: rootReducer,
    middleware: new MiddlewareArray().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;

