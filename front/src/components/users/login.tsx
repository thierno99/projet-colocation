import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsArrowBarLeft } from 'react-icons/bs';

import AccountServices from '../../services/account.service';
import { goUp } from '../../_utils/functions/functions';

function Login() {
    goUp();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
    })

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
                        <p className='text-white'> <span className="">Connexion</span> </p>
                            <BsArrowBarLeft className="mx-2" fontSize={21} color={'white'}/>
                        <Link className='text-white change-color-black' to={'/app/register'}> <span className="">Inscription</span> </Link>
                    </h3>
                    <form 
                        className='flex column m-1 p-1' 
                        onSubmit={(e)=>onSubmit(e)}
                    >

                        <div className='my-half flex column'>
                            <input 
                                type='text' id='email' className='input-login mh-20 b-none p-half mt-1 br-1 bg-opactity text-white' name='email' placeholder='Email'
                                onChange={(e) =>handleInputChange(e)}
                            />
                        </div>

                        <div className='my-half flex column'>
                            <>
                                <input type='password' id='password' className='input-login mh-20 b-none p-half mt-1 br-1 bg-opactity text-white' name='password' placeholder='Mot de passe'
                                    onChange={(e) =>handleInputChange(e)}
                                /> 
                                <small className='text-center mt-2'>
                                    <Link className='text-skyeblue change-color-blue' to={''} > mot de passe oublié ?</Link>
                                </small>
                            </>
                        </div>


                        <div className='flex column center mt-1'>
                            <button className='button-login p-half br-1 pointer text-light-grey bg-opactity b-none'>
                                <h3>Connexion</h3>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login