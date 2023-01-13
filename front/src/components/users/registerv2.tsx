import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsArrowBarRight } from 'react-icons/bs';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import AccountServices from '../../services/account.service';
import { goUp } from '../../_utils/functions/functions';

function Login() {
    goUp();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
    })

    const[passwordIsVisible, setPasswordIsVisible] = useState(false);
    const[confirmPasswordIsVisible, setConfirmPasswordIsVisible] = useState(false);
    const[changeBirth, setChangeBirth] = useState(true);


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit  = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        AccountServices.login(credentials)
           .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    AccountServices.saveToken(res.data.access_token);
                    navigate('/app/users');
                }
            })
            .catch((err) => {
                console.log(err)
            })
        ;
    }
    return (
        <div className='background-login mh-100 flex column j-center'>
            <div className='flex column center'>
                <div className='w-full xs-width'>
                    <h3 className='text-center flex center text-white'> 
                        <Link className='text-white change-color-black hover-underline-animation' to={'/app/signin'}> <span className="">Connexion</span> </Link>
                            <BsArrowBarRight className="mx-2" fontSize={21} color={'white'}/>
                        <p className='text-grey'> <span className="">Inscription</span> </p>
                    </h3>
                    <form 
                        className='flex column m-1 p-1' 
                        onSubmit={(e)=>onSubmit(e)}
                    >
                        <div className='my-half flex column'>
                            <input 
                                type='text' id='lastname' className='input-login mh-20 b-none p-half mt-1 br-1 bg-opactity text-white' name='lastname' placeholder='Nom'
                                onChange={(e) =>handleInputChange(e)}
                            />
                        </div>
                        <div className='my-half flex column'>
                            <input 
                                type='text' id='firstname' className='input-login mh-20 b-none p-half mt-1 br-1 bg-opactity text-white' name='firstname' placeholder='Prénom'
                                onChange={(e) =>handleInputChange(e)}
                            />
                        </div>
                        <div className='my-half flex column'>
                            <input 
                                type='text' id='email' className='input-login mh-20 b-none p-half mt-1 br-1 bg-opactity text-white' name='email' placeholder='Email'
                                onChange={(e) =>handleInputChange(e)}
                            />
                        </div>
                        <div className='my-half flex'>
                            <input 
                                type={changeBirth ? 'text' : 'date'} id='birth' className='w-100 input-login mh-20 b-none p-half mt-1 br-1 bg-opactity text-white' name='birth' placeholder='Date de naissance'
                                onChange={(e) =>handleInputChange(e)}
                                onFocus={() =>setChangeBirth(false)}
                            />
                        </div>
                        <div className='my-half flex column'>
                            <input 
                                type='text' id='phone' className='input-login mh-20 b-none p-half mt-1 br-1 bg-opactity text-white' name='phone' placeholder='Numéro de téléphone'

                                onChange={(e) =>handleInputChange(e)}
                            />
                        </div>
                        <div className='my-half flex column'>
                            <div className='flex relative'>
                                <input type={passwordIsVisible ?'text' : 'password'} id='password' className='w-100 input-login mh-20 b-none p-half mt-1 br-1 bg-opactity text-white' name='password' placeholder='Mot de passe'
                                    onChange={(e) =>handleInputChange(e)}
                                />
                                <span className='absolute right-0 handle-password' onClick={()=> setPasswordIsVisible(!passwordIsVisible)}>
                                    {passwordIsVisible ?<FaRegEyeSlash color={'white'}/> : <FaRegEye color={'white'}/>}
                                </span>
                            </div>
                        </div>
                        <div className='my-half flex column'>
                            <>
                                <div className='flex relative'>
                                    <input type={confirmPasswordIsVisible ?'text' : 'password'} id='password' className='w-100 input-login mh-20 b-none p-half mt-1 br-1 bg-opactity text-white' name='password' placeholder='Confirmer le mot de passe'
                                        onChange={(e) =>handleInputChange(e)}
                                    />
                                    <span className='absolute right-0 handle-password' onClick={()=> setConfirmPasswordIsVisible(!confirmPasswordIsVisible)}>
                                        {confirmPasswordIsVisible ?<FaRegEyeSlash color={'white'}/> : <FaRegEye color={'white'}/>}
                                    </span>
                                </div>
                            </>
                        </div>


                        <div className='flex column center mt-1'>
                            <button className='button-login p-half br-1 pointer text-light-grey bg-opactity b-none'>
                                <h3>Inscription</h3>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login