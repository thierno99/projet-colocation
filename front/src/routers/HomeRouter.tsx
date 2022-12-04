import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HandleLocationList from '../components/handle-location-list/handle-location-list';
import Home from '../components/home/Home';
import Login from '../components/users/login';
import Register from '../components/users/register';
import UserRouter from './UserRouter';

function HomeRouter() {
    return (
        <>
        
            <Routes>
                <Route index element = {<Home/>} />
                <Route path='/app'element = {<Home/>} />  
                <Route path='/app/signin'element = {<Login/>}/>  
                <Route path='/app/register'element = {<Register/>}/> 
                <Route path='/app/rooms'element = {<HandleLocationList/>} />   
                <Route path='/'element = {<UserRouter/>} />
            </Routes>
            <UserRouter/> 
        </>
    );
}

export default HomeRouter;