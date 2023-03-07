import React, { FC, useState } from 'react';


import FormStepOne from './form-step-one';
import FormStepTwo from './form-step-two';
import FormStepThree from './form-step-three';
const AdvertiseAccommodation:FC<any> = (props) => {
    const { defaultAnnonce } = props;
    const [stepActive, setStepActive] = useState('FormStepOne');
    const [announce, setAnnounce] = useState(defaultAnnonce)
    const changeStepActive = (sa: string) => {
        setStepActive(sa);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e);
    }

    return (
        <div className='container my-3 w-full'>
            {
                <div className='flex column center'>
                    <div className='w-full border-gray br-1 shadow-top'>
                        <h3 className='p-1 bg-light-blue br-t-1'> Mon annonce </h3>
                        <hr />
                        <form 
                            method="POST"
                            className='flex column m-1 p-1' 
                            onSubmit={(e) => onSubmit(e)}
                            encType="multipart/form-data"
                        >
                            {
                                stepActive === 'FormStepOne'?
                                <FormStepOne stepActive = {stepActive} setStepActive = {changeStepActive} announce={announce} setAnnounce={setAnnounce}/> :(
                                    stepActive === 'FormStepTwo'?
                                    <FormStepTwo stepActive={stepActive} setStepActive={changeStepActive} announce={announce} setAnnounce={setAnnounce} /> :
                                    <FormStepThree stepActive = {stepActive} setStepActive = {changeStepActive} announce={announce} setAnnounce={setAnnounce}/>
                                )
                            }
                            
                        </form>
                    </div>
                </div>
            }

        </div>
    );
}

export default AdvertiseAccommodation;  