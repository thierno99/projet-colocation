import { GET_ANNOUNCES_BY_ID_FAIL, GET_ANNOUNCES_BY_ID_SUCCESS, GET_ANNOUNCES_LIST_FAIL, GET_ANNOUNCES_LIST_REQUEST, GET_ANNOUNCES_LIST_SUCCESS } from "../../constants/Announce";
import AnnounceService from "../../services/announce-service";

export interface ActionType {
    type: string;
    payload: any;
}

export const AnnounceLocationListAction = () => async (dispatch: any) =>{
    dispatch({
        type: GET_ANNOUNCES_LIST_REQUEST,
    });

    AnnounceService.getAnnouncements()
        .then((res) => {
            dispatch({ type: GET_ANNOUNCES_LIST_SUCCESS, payload: res.data });
        })
        .catch((err) => {
            dispatch({ type: GET_ANNOUNCES_LIST_FAIL, payload: err.message });
        })
    ;
}

export const detailAnnounce = (announceId: string) => async (dispatch: any) => {
    AnnounceService.getAnnouncementById(announceId)
        .then((res) => {
            dispatch({ type: GET_ANNOUNCES_BY_ID_SUCCESS, payload: res });
        })
        .catch((err) => {
            dispatch({ type: GET_ANNOUNCES_BY_ID_FAIL, payload: err.message });
        })
    ;
}