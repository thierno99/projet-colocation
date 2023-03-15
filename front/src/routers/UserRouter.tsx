import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Notification from '../components/profile/notification';
import ShowCandidacies from '../components/profile/show-candidacies';
import ShowRoomates from '../components/profile/show-roomates';
import ShowUserDmd from '../components/profile/show-user-demand';
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

            

            <Route path='/app/user-profile/view/candidacies'element = 
                {
                    <Guards.AuthGard>
                        <ShowCandidacies/>
                    </Guards.AuthGard>
                }
            />

            <Route path='/app/user-profile/view/dmd'element = 
                {
                    <Guards.AuthGard>
                        <ShowUserDmd/>
                    </Guards.AuthGard>
                }
            />

            <Route path='/app/user-profile/view/roomates'element = 
                {
                    <Guards.AuthGard>
                        <ShowRoomates/>
                    </Guards.AuthGard>
                }
            />
            <Route path='/app/user-profile/view/notifs'element = 
                {
                    <Guards.AuthGard>
                        <Notification/>
                    </Guards.AuthGard>
                }
            />
        </Routes>
    );
}

export default UserRouter;