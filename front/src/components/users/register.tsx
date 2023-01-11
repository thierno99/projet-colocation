import React from 'react';
import { BsArrowBarLeft, BsArrowBarRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { goUp } from '../../_utils/functions/functions';
import ShardForm, { ShardFormProps } from '../shared/forms/sharedForm';


function Register() {
    goUp();
    const fields: ShardFormProps ={
        button: {name: 'Je m\'inscrit', link: ''},
        fields: [
            {
                label: <label htmlFor='firstname'>Nom :</label>,
                field: <input type='text' id='firstname' className='p-half mt-1 br-half'/>
                
            },
            {
                label: <label htmlFor='lastname'>prenom :</label>,
                field: <input type='text' id='lastname' className='p-half mt-1 br-half'/>
            },
            {
                label: <label htmlFor='mail'>email :</label>,
                field: <input type='email' id='mail' className='p-half mt-1 br-half'/>
            },
            
            {
                label: <label htmlFor='birth'>Date de naissance :</label>,
                field: <input type='Date' id='birth' className='p-half mt-1 br-half'/>
            },
            {
                label: <label htmlFor='phone'>tel :</label>,
                field: <input type='text' id='phone' className='p-half mt-1 br-half'/>
            },
            {
                label: <label htmlFor='password'>Mot de passe :</label>,
                field: <>
                    <input type='password' id='password' className='p-half mt-1 br-half'/> 
                </>
            },
            
            {
                label: <label htmlFor='confimepassword'>Confimer votre mot de passe :</label>,
                field: <>
                    <input type='password' id='confimepassword' className='p-half mt-1 br-half'/> 
                </>
            },
        ]
    }

    return (
        <div className='container m-1 my-3'>
            <div className='flex column center'>
                <div className='border-1 w-full xs-width border-gray br-1'>
                <h3 className='p-1 bg-light-blue br-t-1 text-center flex center'> 
                        <Link to={'/app/signin'}> <span className="">Connexion</span> </Link>
                            <BsArrowBarLeft className="mx-2" fontSize={21} color={'black'}/>
                        <Link to={'/app/register'}> <span className="">Inscription</span> </Link>
                    </h3>
                    <hr />
                    <ShardForm button={fields.button} fields={fields.fields} />
                </div>
            </div>
        </div>
    );
}

export default Register