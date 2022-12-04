import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthGard from '../_utils/guards/AuthGard';
import Home from './../components/home/Home';

function UserRouter() {
    return (
        <Routes>    
            <Route path="/app/users" element ={
                <AuthGard>
                    <Home/>
                </AuthGard>
            }/>
            <Route path="/app/users/:id" element ={
                <AuthGard>
                    <Home/>
                </AuthGard>
            }/>
        </Routes>
    );
}

export default UserRouter;