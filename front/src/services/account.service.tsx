import Axios from "./axios.service";

const login = (credentials: any) => {
    console.info(credentials);
    return Axios.post('/auth/user/login', credentials);
}
const saveToken = (token:any) => {
    localStorage.setItem('token', token);
}

const logout = () => {
    localStorage.removeItem('token');
}

const isLoggedIn = () => {
    let token = localStorage.getItem('token');
    return !!token;
}

const getToken = () => {
    let token = localStorage.getItem('token');
    return token;
}





const AccountServices = {
    login,
    saveToken,
    logout,
    isLoggedIn,
    getToken
};

export default AccountServices ;