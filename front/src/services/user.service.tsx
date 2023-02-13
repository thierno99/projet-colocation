import { USERS } from "../_utils/mocks/users-mock";
import Axios from "./axios.service";


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
    getAllUsers,
    getUser,
};

export default UserServices ;