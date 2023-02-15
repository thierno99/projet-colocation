import { GET_ANNOUNCES_BY_ID_FAIL, GET_ANNOUNCES_BY_ID_REQUEST, GET_ANNOUNCES_BY_ID_SUCCESS, GET_ANNOUNCES_LIST_FAIL, GET_ANNOUNCES_LIST_REQUEST, GET_ANNOUNCES_LIST_SUCCESS } from "../../constants/Announce";
import AnnounceService from "../../services/announce-service";
// import { RoomsInterface } from "../../_utils/model/rooms-model";
import { ActionType } from "../actions/announce-action";
import { Room, RoomsInterface } from './../../_utils/model/rooms-model';

type IntialStateType = {
    loading: boolean;
    announceList: RoomsInterface[];
}

export type AnnouneStateType = {
    loading: boolean;
    announcement: any;
}
const initialState: IntialStateType = {
    loading: false, 
    announceList: (AnnounceService.getAnnouncements()
        .then((res) => {
            let rooms: RoomsInterface[] = [];
            res.forEach((room: any) => {
                rooms.push(new Room(
                    room.id,
                    room.title,
                    room.description,
                    room.ownerId,
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
            return rooms;
        })
        .catch(() => [])
    ) as unknown as RoomsInterface[],
};

export const AnnounceLocationListReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case GET_ANNOUNCES_LIST_REQUEST:
            return {loading: true};
        
        case GET_ANNOUNCES_LIST_SUCCESS:

            return{
                ...state,
                loading: false,
                announceList: action.payload
            };
        
        case GET_ANNOUNCES_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
}

export const productDetailsReducer = (state: AnnouneStateType = {loading: false, announcement: null}, action: ActionType) => {
    switch (action.type) {
      case GET_ANNOUNCES_BY_ID_REQUEST:
        return { loading: true };

      case GET_ANNOUNCES_BY_ID_SUCCESS:
        return{
            ...state,
            loading: false,
            announcement: action.payload
        };

      case GET_ANNOUNCES_BY_ID_FAIL:
        return {
            loading: false,
            error: action.payload
        };

      default:
        return state;
    }

  };