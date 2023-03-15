import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsArrowBarRight } from 'react-icons/bs';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import UserServices from '../../services/user.service';
import { User } from './../../_utils/model/user-model';
import Form from '../shared/forms/forms';
import { DATE_DD_MM_YYYY_FORMAT_REG, DATE_YYYY_MM_DD_FORMAT_REG, EMAIL_REG, FR_PHONE_NUMBER_FORMAT_REG, PASSWORD_FORMAT_REG } from '../../constants/regex';
import { BytesToString, stringToBytes } from '../../_utils/functions/functions';

function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState(null as unknown as any);
    const [erroeMessage, setErroeMessage] = useState('');

    const[passwordIsVisible, setPasswordIsVisible] = useState(false);
    const[confirmPasswordIsVisible, setConfirmPasswordIsVisible] = useState(false);
    const[changeBirth, setChangeBirth] = useState(true);


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleInputRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
        
    }

    const isValidForm = () => {
        if(
            !credentials || !credentials.sexe || !credentials.firstname || !credentials.lastname || !credentials.phoneNumber ||
            !EMAIL_REG.test(credentials.email) ||
            !FR_PHONE_NUMBER_FORMAT_REG.test(credentials.phoneNumber) ||
            !PASSWORD_FORMAT_REG.test(credentials.password) ||
            (!DATE_DD_MM_YYYY_FORMAT_REG.test(credentials.dateOfBirth.toString())  && !DATE_YYYY_MM_DD_FORMAT_REG.test(credentials.dateOfBirth)) ||
            !credentials.password || !credentials.confirmPassword ||
            credentials.password !== credentials.confirmPassword
        ) {
            return false;
        }
        return true;
    }

    const onSubmit  = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(isValidForm()) {
            const user = new User(
                credentials.lastname,
                credentials.firstname,
                credentials.sexe,
                credentials.dateOfBirth,
                credentials.phoneNumber,
                credentials.email,
                credentials.password,
                false,
                false,
                (null as unknown as File),
                true,
                true,
                []
            );

            UserServices.RegisterUser(user)
                .then((res) => {
                    if (res.status === 200) {
                        alert("votre compte à été bien creer, veillez vous connecté pour profiter plainement des fonctionnaliés");
                        navigate("/app/login");
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
            ;
            setErroeMessage("");
        } else {
            setErroeMessage("Veillez remplir correctement tous les champs svp ! \n pour le mot de passe Minimum huit caractères, au moins une lettre majuscule, \nune lettre minuscule, un chiffre et un caractère spécial :")
        }


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
                        className='flex column m-1 p-1  text-white' 
                        onSubmit={(e)=>onSubmit(e)}
                    >
                        <div className='my-half flex column'>
                            <fieldset className='br-half'>
                                <legend><strong>Type de colocation:</strong></legend>
                                <Form.InputRadio name={'sexe'} label={'Mr'} value={'Mr'} handleInputRadioChange={handleInputRadioChange} checked={credentials?.sexe==="Mr"}/>
                                <Form.InputRadio name={'sexe'} label={'Mme'} value={'Mme'}  handleInputRadioChange={handleInputRadioChange}  checked={credentials?.sexe==="Mme"}/>
                                <Form.InputRadio name={'sexe'} label={'X'} value={'Autre'} handleInputRadioChange={handleInputRadioChange}  checked={credentials?.sexe==="X"}/>
                            </fieldset>
                        </div>
                        <div className='my-litle flex column'>
                            {/* <input 
                                type='text' id='lastname' className='input-login mh-20 b-none p-half mt-1 br-1 bg-opactity text-white' name='lastname' placeholder='Nom'
                                onChange={(e) =>handleInputChange(e)}
                            /> */}
                            <Form.InputText 
                                name="lastname" 
                                value={credentials?.lastname} 
                                label={"Nom"} 
                                placeholder={'nom de famille'} 
                                handleInputChange={handleInputChange}
                                pattern="^(.|\s)*[a-zA-Z]+(.|\s){2,}$"
                                errorMessage='Invalid'
                                required={true}
                            />
                        </div>
                        <div className='my-litle flex column'>
                            {/* <input 
                                type='text' id='firstname' className='input-login mh-20 b-none p-half mt-1 br-1 bg-opactity text-white' name='firstname' placeholder='Prénom'
                                onChange={(e) =>handleInputChange(e)}
                            /> */}
                            <Form.InputText 
                                name="firstname" 
                                value={credentials?.firstname} 
                                label={"Prenom"} 
                                placeholder={'Prenom'} 
                                handleInputChange={handleInputChange}
                                pattern="^(.|\s)*[a-zA-Z]+(.|\s){2,}$"
                                errorMessage='Invalid'
                                required={true}
                            />
                        </div>
                        <div className='my-litle flex column'>
                            {/* <input 
                                type='text' id='email' className='input-login mh-20 b-none p-half mt-1 br-1 bg-opactity text-white' name='email' placeholder='Email'
                                onChange={(e) =>handleInputChange(e)}
                            /> */}
                            <Form.InputMail 
                                name="email" 
                                value={credentials?.email} 
                                label={"Email"} 
                                placeholder={'myaddress@domain.something'} 
                                handleInputChange={handleInputChange}
                                pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                                errorMessage='Invalid'
                                required={true}
                            />
                        </div>
                        <div className='my-half flex column'>
                            <label htmlFor="dateOfBirth"> <strong>Date de Naissance</strong></label>
                            <input 
                                type={changeBirth ? 'text' : 'date'} id='dateOfBirth' className='w-100 input-login mh-20 p-half mt-1 br-half' name='dateOfBirth' placeholder='Date de naissance'
                                onChange={(e) =>handleInputChange(e)}
                                onFocus={() =>setChangeBirth(false)}
                                pattern = "^\d{1,2}\/\d{1,2}\/\d{4}$"
                            />
                        </div>
                        <div className='my-half flex column'>
                            <label htmlFor="phoneNumber"> <strong>Téléphone</strong></label>
                            <input 
                                type='text' id='phoneNumber' className='p-half mt-1 br-half' name='phoneNumber' placeholder='Numéro de téléphone'

                                onChange={(e) =>handleInputChange(e)}
                            />
                        </div>

                        <div className='my-half flex column'>
                            <label htmlFor="password"> <strong>Mot de passe</strong></label>
                            <div className='flex relative'>
                                <input type={passwordIsVisible ?'text' : 'password'} id='password' className='w-100  mh-20 p-half mt-1 br-half' name='password' placeholder='Mot de passe'
                                    onChange={(e) =>handleInputChange(e)}
                                />
                                <span className='absolute right-0 handle-password' onClick={()=> setPasswordIsVisible(!passwordIsVisible)}>
                                    {passwordIsVisible ?<FaRegEyeSlash color={'#042054'}/> : <FaRegEye color={'#042054'}/>}
                                </span>
                            </div>
                        </div>
                        <div className='my-litle flex column'>
                            <>
                                <div className='flex relative'>
                                    <input type={confirmPasswordIsVisible ?'text' : 'password'} id='confirmPassword' className='w-100 mh-20 p-half mt-1 br-half' name='confirmPassword' placeholder='Confirmer le mot de passe'
                                        onChange={(e) =>handleInputChange(e)}
                                    />
                                    <span className='absolute right-0 handle-password' onClick={()=> setConfirmPasswordIsVisible(!confirmPasswordIsVisible)}>
                                        {confirmPasswordIsVisible ?<FaRegEyeSlash color={'#042054'}/> : <FaRegEye color={'#042054'}/>}
                                    </span>
                                </div>
                            </>
                        </div>

                        {
                            erroeMessage && 
                            <div className="danger p-1">
                                {erroeMessage}
                            </div>
                        }


                        <div className='flex column center mt-1'>
                            <button className='btn bg-light-gold p-1 br-1 pointer'>
                                <h3>Je m'inscris</h3>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login