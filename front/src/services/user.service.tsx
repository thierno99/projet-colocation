import { UserInterface } from "../_utils/model/user-model";
import Axios from "./axios.service";

const RegisterUser = (user: UserInterface) => {
    return Axios.post('/auth/user/register', user);
}

const getAllUsers = () => {
    return Axios.get('/app/users');
}

const getUserById = async (userId: string) => {
    const res = await Axios.get('/auth/user/' + userId);
    return res.data;
}

const updateUser = async (userId: string, user: UserInterface) => {
    return Axios.put('/auth/user/' + userId, user);
}

const saveUserProfile = (formdata: FormData) => {
    return Axios.post('/auth/user/saveprofile', formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
    });
}

const getUserAnnounces = (ownerId: string) => {
    return Axios.get('/auth/user/announces/' + ownerId).then((res)=> res.data);
}

const UserServices = {
    RegisterUser,
    getAllUsers,
    getUserById,
    updateUser,
    saveUserProfile,
    getUserAnnounces,
};

export default UserServices ;