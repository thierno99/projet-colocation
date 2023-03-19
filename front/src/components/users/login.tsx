import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsArrowBarLeft } from 'react-icons/bs';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import AccountServices from '../../services/account.service';
import { goUp } from '../../_utils/functions/functions';
import { REFRESH } from '../../constants/constants';
import { AiOutlineClose, AiOutlineReload } from 'react-icons/ai';

function Login() {
    goUp();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
    })

    const [responseMsg, setResponseMsg] = useState(
        {
            message: "",
            style: "",
            type: ""
        }
    );

    const[passwordIsVisible, setPasswordIsVisible] = useState(false);


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
                if (res.status === 200) {
                    AccountServices.saveToken(res.data.accessToken);
                    localStorage.setItem('userId', res.data.id);
                    localStorage.setItem('userName', res.data.name);
                    navigate('/app/users');
                }
            })
            .catch((err) => {
                setResponseMsg({
                    message: "Identifiant ou mot de passe Incorrect",
                    style: "danger",
                    type: 'quit'
                });

            })
        ;
    }
    return (
        <div className='background-login mh-100 flex column j-center relative'>
            {
                responseMsg.message!=="" && 
                <div className={`text-center ${responseMsg.style} w-100 p-1 flex space-around absolute top-0 text-light`}>
                    {responseMsg.message}
                    <button className='bg-none border-1 flex flex-end'
                        onClick={()=> responseMsg.type === 'refresh'? window.location.reload(): setResponseMsg({...responseMsg, message:"", type:""})}
                    >
                        {
                            responseMsg.type===REFRESH ?
                            <>
                                <h4>
                                    rafraichir
                                </h4>
                                <AiOutlineReload fontSize={30}/>
                            </>
                            :
                            <AiOutlineClose fontSize={30}/>
                        }
                    </button>
                </div>
            }
            <div className='flex column center'>
                <div className='w-full xs-width'>
                    <h3 className='text-center flex center text-white'> 
                        <p className='text-grey'> <span className="">Connexion</span> </p>
                            <BsArrowBarLeft className="mx-2" fontSize={21} color={'white'}/>
                        <Link className='text-white change-color-black hover-underline-animation' to={'/app/register'}> <span className="">Inscription</span> </Link>
                    </h3>
                    <form 
                        className='flex column m-1 p-1' 
                        onSubmit={(e)=>onSubmit(e)}
                    >

                        <div className='mt-litle flex column'>
                            <input 
                                type='text' id='email' className='input-login mh-20 b-none p-half mt-1 br-1 bg-opactity text-white' name='email' placeholder='Email'
                                onChange={(e) =>handleInputChange(e)}
                            />
                        </div>

                        <div className='mt-litle flex column'>
                            <>
                                <div className='flex relative'>
                                    <input type={passwordIsVisible ?'text' : 'password'} id='password' className='w-100 input-login mh-20 b-none p-half mt-1 br-1 bg-opactity text-white' name='password' placeholder='Mot de passe'
                                        onChange={(e) =>handleInputChange(e)}
                                    />
                                    <span className='absolute right-0 handle-password' onClick={()=> setPasswordIsVisible(!passwordIsVisible)}>
                                        {passwordIsVisible ?<FaRegEyeSlash color={'white'}/> : <FaRegEye color={'white'}/>}
                                    </span>
                                </div>
                                <small className='mt-little ml-little'>
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