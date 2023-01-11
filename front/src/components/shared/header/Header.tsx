import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FaSignInAlt } from 'react-icons/fa';
import { RiLoginCircleFill, RiLogoutBoxRLine } from 'react-icons/ri';
import AccountServices from '../../../services/account.service';


const Navigation = () => {
    const navigate = useNavigate();
    const logout = () => {
        AccountServices.logout();
        navigate('/app');
    }
    return (
        <nav>
            <ul className='flex row'>
                {
                    AccountServices.isLoggedIn()?
                    <li className='px-half flex center pointer'>
                        <RiLogoutBoxRLine/>
                        <span 
                            onClick={logout}
                            className='px-px text-light text-center' 
                        >
                            Deconnexion
                        </span>
                    </li>
                    :
                    <>
                        <li className='px-half flex center pointer'>
                            <RiLoginCircleFill/>
                            <Link 
                                to={'/app/signin'}
                                className='px-px text-light text-center' 
                            >
                                connexion
                            </Link>
                        </li>
                        <li>
                            |
                        </li>

                        <li className='px-half flex center text-center pointer'>
                            <FaSignInAlt/>
                            <Link className='px-px text-light text-center' to={'/app/register'}>
                                Inscription
                            </Link>
                        </li>
                    </>
                }
            </ul>

        </nav>
    );
}

const Header = () => {
    return(
        <div className='text-light p-1'>
            <div
                className='flex row space-between' 
            >
                {/* <div className='logo pointer'>
                    ColocNow
                </div> */}

                <h3 className='pointer'>
                    <Link 
                        className='text-light'
                        to={'/app'}>C
                    </Link>
                </h3>

                <Navigation/>

            </div>
        </div>
    );
}

export default Header;