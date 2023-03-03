import { GET_ANNOUNCES_BETWEEN_START_END_FAIL, GET_ANNOUNCES_BETWEEN_START_END_SUCCESS, GET_ANNOUNCES_BY_ID_FAIL, GET_ANNOUNCES_BY_ID_SUCCESS, GET_ANNOUNCES_LIST_FAIL, GET_ANNOUNCES_LIST_REQUEST, GET_ANNOUNCES_LIST_SUCCESS } from "../../constants/Announce";
import AnnounceService from "../../services/announce-service";
import { Room, RoomsInterface } from "../../_utils/model/rooms-model";

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
            let rooms: RoomsInterface[] = [];
            res.forEach((room: any) => {
                rooms.push(new Room(
                    room.id,
                    room.title,
                    room.description,
                    room.ownerId,
                    room.state,
                    room.city,
                    room.postalCode,
                    room.address,
                    room.nbRoomatesSeached,
                    room.publishedAt,
                    room.price,
                    room.principalPicture,
                    room.announceType,
                    room.ownerCertified,
                    room.roomType,
                    room.roomfurnishedType,
                    room.genderSearched
                ));
            });
            dispatch({ type: GET_ANNOUNCES_BY_ID_SUCCESS, payload: rooms });
        })
        .catch((err) => {
            dispatch({ type: GET_ANNOUNCES_BY_ID_FAIL, payload: err.message });
        })
    ;
}

export const getAnnouncementsBetween = (start: number, end: number) => async (dispatch: any) => {
    AnnounceService.getAnnouncementsBetween(start, end)
        .then((res) => {
            let rooms: RoomsInterface[] = [];
            res.forEach((room: any) => {
                rooms.push(new Room(
                    room.id,
                    room.title,
                    room.description,
                    room.ownerId,
                    room.state,
                    room.city,
                    room.postalCode,
                    room.address,
                    room.nbRoomatesSeached,
                    room.publishedAt,
                    room.price,
                    room.principalPicture,
                    room.announceType,
                    room.ownerCertified,
                    room.roomType,
                    room.roomfurnishedType,
                    room.genderSearched
                ));
            });
            dispatch({ type: GET_ANNOUNCES_BETWEEN_START_END_SUCCESS, payload: rooms });
        })
        .catch((err) => {
            dispatch({ type: GET_ANNOUNCES_BETWEEN_START_END_FAIL, payload: err.message });
        })
    ;
}