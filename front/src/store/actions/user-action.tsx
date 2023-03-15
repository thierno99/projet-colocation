import { GET_USER_ANNOUNCES_FAIL, GET_USER_ANNOUNCES_SUCCESS, GET_USER_BY_ID_FAIL, GET_USER_BY_ID_SUCCESS } from "../../constants/User";
import UserServices from "../../services/user.service"
import { Room, RoomsInterface } from "../../_utils/model/rooms-model";
import { User } from "../../_utils/model/user-model";

export const UserInfoAction = (userId: string) => async (dispatch: any) => {
    UserServices.getUserById(userId)
    .then((user) => {
        let userInfo = new User(
            user.lastname,
            user.firstname,
            user.sexe,
            user.dateOfBirth,
            user.phoneNumber,
            user.email,
            user.password,
            user.isEmailVerified,
            user.iscertified,
            user.profileImg,
            user.autorizeHaldleTel,
            user.autorizeHaldleEmail,
            user.roles
        );
        userInfo.id = userId;
        dispatch({ type: GET_USER_BY_ID_SUCCESS, payload: userInfo });
    })
    .catch((err) => {
        dispatch({ type: GET_USER_BY_ID_FAIL, payload: err.message });
    })
}

export const UserAnnouncesAction = (userId: string) => async (dispatch: any) => {
    UserServices.getUserAnnounces(userId)
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
        dispatch({ type: GET_USER_ANNOUNCES_SUCCESS, payload: rooms });
    })
    .catch((err) => {
        dispatch({ type: GET_USER_ANNOUNCES_FAIL, payload: err.message });
    })
}