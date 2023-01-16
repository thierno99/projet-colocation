import React, { useState } from 'react';


import FormStepOne from './form-step-one';
import FormStepTwo from './form-step-two';
import FormStepThree from './form-step-three';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../../store/store';
import { DefaultAnnonce, /*RoomsInterface */} from '../../_utils/model/rooms-model';

const AdvertiseAccommodation = () => {
    const [stepActive, setStepActive] = useState('FormStepOne');
    const [announce, setAnnounce] = useState(DefaultAnnonce)

    // const dispatch = useDispatch();

    // const advertiseAccommodation = useSelector((state: RootState) => state.advertiseAccommodation);

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
                            className='flex column m-1 p-1' 
                            onSubmit={(e) => onSubmit(e)}
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