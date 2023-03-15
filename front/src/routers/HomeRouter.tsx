import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdvertiseAccommodation from '../components/advertise-accommodation/advertise-accommodation';
import EditAnnouncement from '../components/edit-announcement/edit-announcement';
import HandleLocationList from '../components/handle-location-list/handle-location-list';
import HandleLocation from '../components/handle-location/handle-location';
import Home from '../components/home/Home';
import Footer from '../components/shared/footer/Footer';
import Login from '../components/users/login';
import Register from '../components/users/registerv2';
import Guards from '../_utils/guards/Guards';
import { DefaultAnnonce } from '../_utils/model/rooms-model';
import UserRouter from './UserRouter';

function HomeRouter() {
    return (
        <>
        
            <Routes>
                <Route index element = {<Home/>} />
                <Route path='/app'element = {<Home/>} />  
                <Route path='/app/signin'element = {<Login/>}/>  
                <Route path='/app/register'element = {<Register/>}/> 
                <Route path='/app/rooms/:id'element = {<HandleLocation/>} />  

                <Route path='/app/rooms/make-announce/'element = 
                    {
                        <Guards.AuthGard>
                            <AdvertiseAccommodation defaultAnnonce = {DefaultAnnonce}/>
                        </Guards.AuthGard>
                    }
                 />

                <Route path='/app/room/edit-announce/:id'element = 
                    {
                        <Guards.AuthGard>
                            <EditAnnouncement/>
                        </Guards.AuthGard>
                    }
                />
                 
                 
                <Route path='/app/rooms'element = {<HandleLocationList/>} />  
                <Route path='/'element = {<UserRouter/>} />
            </Routes>
            <UserRouter/> 
        </>
    );
}

export const FooterRoot = () => {
    return(
        <Routes>    
                <Route path="/app" element ={
                    <footer>
                        <Footer/>
                    </footer>
                }/>
                <Route path="/app/rooms/*" element ={
                    <footer>
                        <Footer/>
                    </footer>
                }/>
        </Routes>
    )
}

export default HomeRouter;