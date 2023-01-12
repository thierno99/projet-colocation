import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Guards from '../_utils/guards/AuthGard';
import Home from './../components/home/Home';

function UserRouter() {
    return (
        <Routes>    
            <Route path="/app/users" element ={
                <Guards.AuthGard>
                    <Home/>
                </Guards.AuthGard>
            }/>
            <Route path="/app/users/:id" element ={
                <Guards.AuthGard>
                    <Home/>
                </Guards.AuthGard>
            }/>
        </Routes>
    );
}

export default UserRouter;