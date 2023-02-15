import { USERS } from "../_utils/mocks/users-mock";
import { UserInterface } from "../_utils/model/user-model";
import Axios from "./axios.service";

const RegisterUser = (user: UserInterface) => {
    return Axios.post('/auth/user/register', user);
}

const getAllUsers = () => {
    return Axios.get('/app/users');
}

const getUser = (uid: number) => {
    return Axios.get('/app/users/'+ uid);
}

export const getMockUser = (uid: string) => {
    return USERS.find(user => user.id === uid);
}


const UserServices = {
    RegisterUser,
    getAllUsers,
    getUser,
};

export default UserServices ;