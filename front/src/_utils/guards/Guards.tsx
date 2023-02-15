import { Navigate } from "react-router-dom";
import { FC } from 'react';
import AccountServices from '../../services/account.service';

interface Props {
    children: JSX.Element;
}

const AuthGard:FC<Props> = (props) => {
    const {children} = props;

    if(!AccountServices.isLoggedIn()){
        return <Navigate to='/app/signin'/>;
    }
    
    return children;
    
}

const Guards = {
    AuthGard,
}
export default Guards;