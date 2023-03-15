
import { ActionType } from '../actions/announce-action';
import { GET_USER_BY_ID_REQUEST, GET_USER_BY_ID_SUCCESS, GET_USER_BY_ID_FAIL, GET_USER_ANNOUNCES_FAIL, GET_USER_ANNOUNCES_SUCCESS, GET_USER_ANNOUNCES_REQUEST } from './../../constants/User';
import { AnnouneStateType } from './announce-reducer';

export type UserStateType = {
    loading: boolean;
    user: any;
}

export const UserInfoReducer = (state: UserStateType = {loading: false, user: null}, action: ActionType) => {
    switch (action.type) {
      case GET_USER_BY_ID_REQUEST:
        return { loading: true };

      case GET_USER_BY_ID_SUCCESS:
        return{
            ...state,
            loading: false,
            user: action.payload
        };

      case GET_USER_BY_ID_FAIL:
        return {
            loading: false,
            error: action.payload
        };

      default:
        return state;
    }

};

export const UserAnnouncesReducer = (state: AnnouneStateType = {loading: false, announcement: null}, action: ActionType) => {
    switch (action.type) {
      case GET_USER_ANNOUNCES_REQUEST:
        return { loading: true };

      case GET_USER_ANNOUNCES_SUCCESS:
        return{
            ...state,
            loading: false,
            user: action.payload
        };

      case GET_USER_ANNOUNCES_FAIL:
        return {
            loading: false,
            error: action.payload
        };

      default:
        return state;
    }

};