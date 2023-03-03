import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserProfile from '../components/profile/user-profile';
import Guards from '../_utils/guards/Guards';
import Home from './../components/home/Home';

function UserRouter() {
    return (
        <Routes>    
            <Route path="/app/users" element ={
                <Guards.AuthGard>
                    <Home/>
                </Guards.AuthGard>
            }/>
            <Route path="/app/user-profile" element ={
                <Guards.AuthGard>
                    <UserProfile/>
                </Guards.AuthGard>
            }/>
        </Routes>
    );
}

export default UserRouter;