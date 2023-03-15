
import { ChangeEvent, FC, useState } from 'react';

import Form, { CheckboxProps } from '../shared/forms/forms';
import { FormStepProps } from './form-step-one';

export const Checkbox:FC<CheckboxProps> = (props) => {
    const { name, label,handleCheckboxChange, checked } = props;

    return (
        <div className='p-half'>
            <input type="checkbox" id={name} name={name} onChange={(e)=>handleCheckboxChange('genderSearched', e)} checked={checked}/>
            <label htmlFor={name} className='px-half'>{label}</label>
        </div>
    );
}

const FormStepTwo: FC<FormStepProps> = (props) => {
    const { announce, stepActive, setStepActive, setAnnounce } = props;

    const [erroeMessage, setErroeMessage] = useState('');
    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAnnounce({
            ...announce,
            [e.target.name]: e.target.value
        })
    }

    const handleCheckboxChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {

        const index = announce.genderSearched.indexOf(e.target.name);
        let genders:string[] = announce.genderSearched;

        if(index===-1 && e.target.checked){
            genders.push(e.target.name);
        }else if(index!==-1){
            genders.splice(index,1);
        }

        setAnnounce({
            ...announce,
            [field]: genders
        })
    }

    const handleInputRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnnounce({
            ...announce,
            [e.target.name]: e.target.value
        })
        
    }

    const handleFurnishedTypechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnnounce({
            ...announce,
            [e.target.name]: (e.target.value==="Meublé")
        })
        
    }

    const isValidForm = () => {
        if(
            announce.genderSearched.length<=0 ||
            announce.announceType==='' ||
            announce.price <= 0 ||
            announce.nbRoomatesSeached <= 0
        ) {
            return false;
        }
        return true;
    }

    const goNext = () => {
        if(isValidForm()) {
            setStepActive("FormStepThree");
        } else {
            setErroeMessage("Veillez remplir correctement tout les champs svp ! \n (prix > 0 && nombre de colocs > 0)")
        }
    }
    return (
        <>
            
            <h3 className='text-center my-1'>Information sur le logement</h3>
            <div className='my-half flex column'>
                <fieldset className='br-half'>
                    <legend><strong>Coloc Récherché(e)s:</strong></legend>
                    <Checkbox name={'homme'} label={'Homme'} handleCheckboxChange={handleCheckboxChange} checked={announce.genderSearched.indexOf('homme')!==-1}/>
                    <Checkbox name={'femme'} label={'Femme'} handleCheckboxChange={handleCheckboxChange} checked={announce.genderSearched.indexOf('femme')!==-1}/>
                </fieldset>
            </div>

            <div className='my-half flex column'>
                <fieldset className='br-half'>
                    <legend><strong>Type de colocation:</strong></legend>
                    <Form.InputRadio name={'roomType'} label={'Appartement'} value={'APPARTEMENT'} handleInputRadioChange={handleInputRadioChange} checked={announce.roomType==="APPARTEMENT"}/>
                    <Form.InputRadio name={'roomType'} label={'Maison'} value={'MAISON'}  handleInputRadioChange={handleInputRadioChange}  checked={announce.roomType==="MAISON"}/>
                    <Form.InputRadio name={'roomType'} label={'Studio'} value={'STUDIO'} handleInputRadioChange={handleInputRadioChange}  checked={announce.roomType==="STUDIO"}/>
                </fieldset>
            </div>

            <div className='my-half flex column'>
                <fieldset className='br-half'>
                    <legend> <strong>Etat de la Localité:</strong></legend>
                    <Form.InputRadio name={'roomfurnishedType'} label={'Non Meublé'} value={'Non Meublé'} handleInputRadioChange={handleFurnishedTypechange} checked={!announce.roomfurnishedType}/>
                    <Form.InputRadio name={'roomfurnishedType'} label={'Meublé'} value={'Meublé'} handleInputRadioChange={handleFurnishedTypechange} checked={announce.roomfurnishedType}/>
                </fieldset>
            </div>

            <Form.InputNumber 
                name={'price'} 
                value={announce.price} 
                label={'Prix'} 
                placeholder={'ex: 800'}
                handleInputChange={handleInputChange}
                pattern='^([0-9]{0,2}((.)[0-9]{0,2}))$'
                errorMessage=''
                required={true}
            />

            <Form.InputNumber 
                name={'nbRoomatesSeached'} 
                value={announce.nbRoomatesSeached} 
                label={'Nombre de colocs Récherchés'} 
                placeholder={'ex: 3'}
                handleInputChange={handleInputChange}
                pattern='^[1-9]+\d*$'
                errorMessage='veillez remplir correctement ce champs'
                required={true}
            />

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
                    type='button'
                    onClick={goNext}
                > <h3>suivant</h3></button>

            </div>

            {
                erroeMessage && 
                <div className="danger p-1">
                    {erroeMessage}
                </div>
            }
        </>
    );
}

export default FormStepTwo;