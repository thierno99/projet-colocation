import Axios from "./axios.service";

const login = (credentials: any) => {
    return Axios.post('/api/login', credentials);
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