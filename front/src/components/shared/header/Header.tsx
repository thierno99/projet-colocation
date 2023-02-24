import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { RiLogoutBoxRLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';

import AccountServices from '../../../services/account.service';
import { BiUserCircle } from 'react-icons/bi';


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
                    <>
                        <li className='px-half flex center pointer'>
                            <RiLogoutBoxRLine/>
                            <span 
                                onClick={logout}
                                className='px-px text-light text-center' 
                            >
                                Deconnexion
                            </span>
                        </li>

                        <li className='px-half flex center pointer'>
                            <CgProfile/>
                            <span 
                                onClick={logout}
                                className='px-px text-light text-center' 
                            >
                                Bah Thierno
                            </span>
                        </li>
                    </>
                    :
                    <>
                        <li className='px-half flex center pointer'>
                            <Link
                                to={'/app/signin'}
                                className='px-px text-light text-center flex center' 
                                >
                                <BiUserCircle/>
                                <span className="px-px pb-px">Connexion</span>
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
            <div className='flex row space-between'>
                <h3 className='pointer'>
                    <Link 
                        className='text-light'
                        to={'/app'}
                    >
                        GoColoc
                    </Link>
                </h3>
                <Navigation/>
            </div>
        </div>
    );
}

export default Header;