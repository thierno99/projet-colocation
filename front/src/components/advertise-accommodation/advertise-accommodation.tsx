
import React, { FC, useState } from 'react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

import { IoMdAddCircle } from 'react-icons/io';
import { MdAddPhotoAlternate } from 'react-icons/md';

import defaultpng from '../../assets/Images/defaultpng.png';

interface FormStepProps {
    stepActive: string;
    setStepActive:  (sa: string) => void;
}

const FormStepOne: FC<FormStepProps> = (props) => {
    const { stepActive, setStepActive } = props;
    return (
        <>
            
            <div className='my-half flex column'>
                <label htmlFor='title'>nom de l'annonce</label>
                <input 
                    type='text' id='title' className='p-half mt-1 br-half' placeholder='ex: je mets une partie de ma maison en location'
                />
            </div>

            <div className='my-1 flex column'>
                <label htmlFor='description'>Description</label>
                <textarea 
                    id='description' 
                    className='p-half mt-1 br-half' 
                    placeholder="Ajoutez une petite description sur votre annonce pour plus d'informations"
                    rows = {5} cols= {33}
                >
                </textarea> 
            </div>

            <div className='my-half flex column'>
                <label htmlFor='city'>Ville</label>
                <input 
                    type='text' id='city' className='p-half mt-1 br-half' placeholder='ex: Bordeaux'
                />
            </div>

            <div className='my-half flex column'>
                <label htmlFor='postalCode'>Code postal</label>
                <input 
                    type='text' id='postalCode' className='p-half mt-1 br-half' placeholder='ex: 33000'
                />
            </div>

            <div className='my-half flex column'>
                <label htmlFor='address'>Adresse complète</label>
                <input 
                    type='text' id='address' className='p-half mt-1 br-half' placeholder='ex: 22 rue marechal josh'
                />
            </div>


            <div className={'my-1 flex ' + (stepActive === 'FormStepOne'?'flex-end':'space-between')}>
                
                <button 
                    className={'p-half br-half pointer mt-1 bg-gold'}
                    onClick={() => setStepActive('FormStepTwo')}
                > <h3>suivant</h3></button>

            </div>
        </>
    );
}

const FormStepTwo: FC<FormStepProps> = (props) => {
    const { stepActive, setStepActive } = props;
    return (
        <>
            <h3 className='text-center my-1'>Information sur le logement</h3>
            <div className='my-half flex column'>

                <fieldset className='br-half'>
                    <legend>Coloc Récherché(e)s:</legend>

                    <div className='p-half'>
                        <input type="checkbox" id="homme" name="homme"/>
                        <label htmlFor="homme" className='px-half'>Homme</label>
                    </div>

                    <div className='p-half'>
                        <input type="checkbox" id="femme" name="femme"/>
                        <label htmlFor="femme" className='px-half'>Femme</label>
                    </div>
                </fieldset>

            </div>

            <div className='my-half flex column'>
                <fieldset className='br-half'>
                    <legend>Type de colocation:</legend>

                    <div className='p-half'>
                        <input type="checkbox" id="appart" name="appart"/>
                        <label htmlFor="appart" className='px-half'>Appartement</label>
                    </div>

                    <div className='p-half'>
                        <input type="checkbox" id="maison" name="maison"/>
                        <label htmlFor="maison" className='px-half'>Maison</label>
                    </div>

                    <div className='p-half'>
                        <input type="checkbox" id="studio" name="studio"/>
                        <label htmlFor="studio" className='px-half'>Studio</label>
                    </div>
                </fieldset>

            </div>

            <div className='my-half flex column'>
                
                <fieldset className='br-half'>
                    <legend>Etat de la Localité:</legend>

                    <div className='p-half'>
                        <input type="checkbox" id="notFournished" name="notFournished"/>
                        <label htmlFor="notFournished" className='px-half'>Non Meublé</label>
                    </div>

                    <div className='p-half'>
                        <input type="checkbox" id="fournished" name="fournished"/>
                        <label htmlFor="fournished" className='px-half'>Meublé</label>
                    </div>
                </fieldset>

            </div>

            <div className='my-half flex column'>
                <label htmlFor='price'>Prix</label>
                <input 
                    type='number' id='price' className='p-half mt-1 br-half' placeholder='ex: 800'
                />
            </div>

            <div className='my-half flex column'>
                <label htmlFor='nbRoomatesSeached'>Nombre de colocs Récherchés</label>
                <input 
                    type='number' id='nbRoomatesSeached' className='p-half mt-1 br-half' placeholder='ex: 3'
                />
            </div>


            <div className={'my-1 flex ' + (stepActive === 'FormStepOne'?'flex-end':'space-between')}>
                {
                    stepActive !== 'FormStepOne'?
                        <button 
                            className='p-half br-half pointer mt-1'
                            onClick={() => setStepActive('FormStepOne')}
                        > <h3>precedant</h3></button>
                    :   null
                }
                
                <button 
                    className={'p-half br-half pointer mt-1 bg-gold'}
                    onClick={() => setStepActive('FormStepThree')}
                > <h3>suivant</h3></button>

            </div>
        </>
    );
}


const FormStepThree: FC<FormStepProps> = (props) => {
    const { stepActive, setStepActive } = props;
    const [isInfoPrincipalActive, setisInfoPrincipalActive] = useState(false);
    return (
        <div className=''>
            <h3 className='text-center my-1'>Ajoutez des Images de votre proprieté</h3>
            <div className='relative column center'>
                <div>
                    <div className="flex center my-1 relative">
                        <h3>Image principale</h3>
                        <AiOutlineQuestionCircle className='mx-half pointer' fontSize={22}
                        onClick = {()=> setisInfoPrincipalActive(!isInfoPrincipalActive)}
                        />
                        {
                            isInfoPrincipalActive && <div className="bottom-0 bg-light-blue z-9999 p-1">
                                C'est cette photo quis'affichera, une fois que les <br /> utilisateurs <br /> 
                                tomberont sur votre offre.
                            </div>
                        }
                    </div>
                    
                </div>
                <div className='flex center'>
                    <div className='flex center border-1 br-1 add-img-box pointer hover-success'>

                        <MdAddPhotoAlternate fontSize={30}/>
                    </div>
                </div>

                <div className='flex center my-2 wrap'>
                    <h3 className='my-1 w-full text-center'>Ajoutez plus d'images</h3>
                    <div className='flex center border-1 br-1 add-img-box pointer hover-success m-1'>
                        <MdAddPhotoAlternate fontSize={30}/>
                    </div>

                    <div className='flex center border-1 br-1 add-img-box pointer hover-success m-1'>
                        <MdAddPhotoAlternate fontSize={30}/>
                    </div>

                    <div className='flex center border-1 br-1 add-img-box pointer hover-success m-1'>
                        <MdAddPhotoAlternate fontSize={30}/>
                    </div>

                    <div className='flex center border-1 br-1 add-img-box pointer hover-success m-1'>
                        <MdAddPhotoAlternate fontSize={30}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

const AdvertiseAccommodation = () => {
    const [stepActive, setStepActive] = useState('FormStepOne');
    const changeStepActive = (sa: string) => {
        setStepActive(sa);
    }
    return (
        <div className='container m-1 my-3'>
            {
                stepActive === 'FormStepThree'?
                    <FormStepThree stepActive = {stepActive} setStepActive = {changeStepActive} />
                : 
            
                <div className='flex column center'>
                    <div className='border-1 w-full xs-width border-gray br-1'>
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