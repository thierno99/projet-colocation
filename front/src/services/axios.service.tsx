import axios from 'axios';
import AccountServices from './account.service';

const Axios = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

Axios.interceptors.request.use(request => {
    if(AccountServices.isLoggedIn()) {
        if(request.headers) {
            request.headers.Authorization = 'Bearer ' + AccountServices.getToken() ;
        }
    }
    return request ;
})

export default Axios ;