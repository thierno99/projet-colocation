import Axios from "./axios.service";


const getAllUsers = () => {
    return Axios.get('/app/users');
}

const getUser = (uid: number) => {
    return Axios.get('/app/users/s'+ uid);
}


const UserServices = {
    getAllUsers,
    getUser,
};

export default UserServices ;