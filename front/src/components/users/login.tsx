import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AccountServices from '../../services/account.service';
import { goUp } from '../../_utils/functions/functions';

function Login() {
    goUp();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: 'bahthie@gmail.com',
        password: 'RoronoaZoro',
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
        <div className='container m-1 my-3'>
            <div className='flex column center'>
                <div className='border-1 w-full xs-width border-gray br-1'>
                    <h3 className='p-1 bg-light-blue br-t-1'> Connexion </h3>
                    <hr />
                    <form 
                        className='flex column m-1 p-1' 
                        onSubmit={(e)=>onSubmit(e)}
                    >

                        <div className='my-1 flex column'>
                            <label htmlFor='email'>identifiant :</label>
                            <input 
                                type='text' id='email' className='p-half mt-1 br-half' value={credentials.email} name='email'
                                onChange={(e) =>handleInputChange(e)}
                            />
                        </div>

                        <div className='my-1 flex column'>
                            <label htmlFor='password'>Mot de passe :</label>
                            <>
                                <input type='password' id='password' className='p-half mt-1 br-half' value={credentials.password} name='password'
                                    onChange={(e) =>handleInputChange(e)}
                                /> 
                                <small className='text-center mt-1'>
                                    <Link to={''} > mot de passe oublié ?</Link>
                                </small>
                            </>
                        </div>


                        <div className='my-1 flex column'>
                            <button className='p-half br-half pointer mt-1 bg-primary text-light'
                            > <h3>Connexion</h3></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login