import React, { useState } from 'react';

import FormStepOne from './form-step-one';
import FormStepThree from './form-step-three';
import FormStepTwo from './form-step-two';

const AdvertiseAccommodation = () => {
    const [stepActive, setStepActive] = useState('FormStepOne');
    const changeStepActive = (sa: string) => {
        setStepActive(sa);
    }
    return (
        <div className='container my-3'>
            {
                stepActive === 'FormStepThree'?
                    <FormStepThree stepActive = {stepActive} setStepActive = {changeStepActive} />
                : 
            
                <div className='flex column center'>
                    <div className='border-1 w-full xs-width border-gray br-1 shadow'>
                        <h3 className='p-1 bg-light-blue br-t-1'> Mon annonce </h3>
                        <hr />
                        <form 
                            className='flex column m-1 p-1' 
                        >
                            {
                                stepActive === 'FormStepOne'?
                                <FormStepOne stepActive = {stepActive} setStepActive = {changeStepActive} /> :(
                                    stepActive === 'FormStepTwo'?
                                    <FormStepTwo stepActive = {stepActive} setStepActive = {changeStepActive} /> :
                                    null
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