import Axios from "./axios.service";

const login = (credentials: any) => {
    return Axios.post('/auth/user/login', credentials);
}
const saveToken = (token:any) => {
    localStorage.setItem('token', token);
}

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
}

const isLoggedIn = () => {
    let token = localStorage.getItem('token');
    return !!token;
}

const getToken = () => {
    let token = localStorage.getItem('token');
    return token;
}

const getUserId = () => {
    let token = localStorage.getItem('userId');
    return token;
}


const AccountServices = {
    login,
    saveToken,
    logout,
    isLoggedIn,
    getToken,
    getUserId,
};

export default AccountServices ;