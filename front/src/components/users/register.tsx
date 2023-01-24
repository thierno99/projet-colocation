import React from 'react';
import { BsArrowBarRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { goUp } from '../../_utils/functions/functions';
import ShardForm, { ShardFormProps } from '../shared/forms/sharedForm';


function Register() {
    goUp();
    const fields: ShardFormProps ={
        button: {name: 'Je m\'inscrit', link: ''},
        fields: [
            {
                field: <input type='text' id='lastname' className='input-login mh-20 b-none p-half mt-1 br-1 bg-opactity text-white' placeholder='Nom'/>
                
            },
            {
                field: <input type='text' id='firstname' className='input-login mh-20 b-none p-half mt-1 br-1 bg-opactity text-white' placeholder='Prénom'/>
            },
            {
                field: <input type='email' id='mail' className='input-login mh-20 b-none p-half mt-1 br-1 bg-opactity text-white' placeholder='Email'/>
            },
            
            {
                field: <input type='Date' id='birth' className='input-login mh-20 b-none p-half mt-1 br-1 bg-opactity text-white' placeholder='Date de naissance'/>
            },
            {
                field: <input type='text' id='phone' className='input-login mh-20 b-none p-half mt-1 br-1 bg-opactity text-white' placeholder='Numéro de téléphone'/>
            },
            {
                field: <>
                    <input type='password' id='password' className='input-login mh-20 b-none p-half mt-1 br-1 bg-opactity text-white' placeholder='Mot de passe'/> 
                </>
            },
            {
                field: <>
                    <input type='password' id='confimepassword' className='input-login mh-20 b-none p-half mt-1 br-1 bg-opactity text-white' placeholder='Confirmer le mot de passe'/> 
                </>
            },
        ]
    }

    return (
        <div className='background-login mh-100 flex column j-center'>
            <div className='flex column center'>
                <div className='w-full xs-width'>
                    <h3 className='text-center flex center text-white'> 
                        <Link className='text-white change-color-black' to={'/app/signin'}> <span className="">Connexion</span> </Link>
                            <BsArrowBarRight className="mx-2" fontSize={21} color={'white'}/>
                        <p className='text-white'> <span className="">Inscription</span> </p>
                    </h3>
                    <ShardForm button={fields.button} fields={fields.fields} />
                </div>
            </div>
        </div>
    );
}

export default Register