
import { ChangeEvent, FC, useState } from 'react';
import { CITY_REG, POSTAL_CODE_REG, TEXT_REG } from '../../constants/regex';
import { getCitiesOfDepartement, getDepartementOfCountry, getDepartmentByStatecode } from '../../_utils/functions/functions';
import { RoomsInterface } from '../../_utils/model/rooms-model';

import Form from '../shared/forms/forms';

export interface FormStepProps {
    stepActive: string;
    announce: RoomsInterface;
    setAnnounce: React.Dispatch<React.SetStateAction<RoomsInterface>>
    setStepActive:  (sa: string) => void;
}

const FormStepOne: FC<FormStepProps> = (props) => {
    const { announce, stepActive, setStepActive, setAnnounce } = props;
    const [hasError, setHasError] = useState(false);
    let errorFields = {
        title: {hasError: false, errMsg: ''},
        description: {hasError: false, errMsg: ''},
        city: {hasError: false, errMsg: ''},
        postalCode: {hasError: false, errMsg: ''},
        address: {hasError: false, errMsg: ''},
        state: {hasError: false, errMsg: ''},
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAnnounce({
            ...announce,
            [e.target.name]: e.target.value
        })
    }
    
    const handleTexteAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setAnnounce({
            ...announce,
            [e.target.name]: e.target.value
        });
    }
    
    const handleSelectChange = (type: string, e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = e.target.options.selectedIndex;
        setAnnounce({
            ...announce,
            [e.target.name]: e.target.options[selectedIndex].value
        });
    }
    
    const setFieldError = (field: string, msg: string, hasErr:boolean) => {
        errorFields = {...errorFields, [field]: {hasError: hasErr, msg: msg}}
    }
    
    const isValidSubmitedForm = (announce: RoomsInterface): boolean => {
        let isValid = true;
        if(!POSTAL_CODE_REG.test(announce.postalCode)){
            setFieldError('postalCode', 'code postal invalid', true);
            isValid = false;
        }else {
            setFieldError('postalCode', '', false);
        }
        
        if(!CITY_REG.test(announce.city)){
            setFieldError('city', 'le format du nom de la ville est invalid', true);
            isValid = false;
        }else {
            setFieldError('city', '', false);
        }
        
        if(!TEXT_REG.test(announce.title)){
            setFieldError('title', 'format invalide', true);
            isValid = false;
        }else {
            setFieldError('title', '', false);
        }
        
        return isValid;
    }
    
    const goNext = () => {
        if(isValidSubmitedForm(announce)){
            setStepActive('FormStepTwo')
        }else{
            // console.info(errorFields)
            setHasError(true);
        }
    }

    
    return (
        <>
            
            <Form.InputText 
                name="title" 
                value={announce.title} 
                label={"nom de l'annonce"} 
                placeholder={'ex: je mets une partie de ma maison en location'} 
                handleInputChange={handleInputChange}
                err={errorFields.title}
            />

            <Form.TextArea 
                name = {'description'}
                value = {announce.description}
                label = {'Description'}
                placeholder = {"Ajoutez une petite description sur votre annonce pour plus d'informations"}
                rows = {5} 
                cols= {33}
                handleTexteAreaChange={handleTexteAreaChange}
                err={errorFields.description}
            />


            <Form.SelectForm 
                name ={'state'}
                options={
                    getDepartementOfCountry('FR').map(departement=>  (
                        <option 
                            value={departement.isoCode} 
                            key={departement.isoCode} 
                            selected={departement.name===(getDepartmentByStatecode('FR', announce.state) && getDepartmentByStatecode('FR', announce.state).name)}
                        > 
                            {departement.name}
                        </option>
                    ))
                }
                err={errorFields.state}
                handleSelectChange ={handleSelectChange}
            />

            <Form.SelectForm 
                name ={'city'}
                options={
                    getCitiesOfDepartement('FR', announce.state).map((city,i)=>  (
                        <option value={city.name} key={city.name} selected={city.name===announce.city}> {city.name}</option>
                    ))
                }
                err={errorFields.city}
                handleSelectChange ={handleSelectChange}
            />

            <Form.InputText 
                name={'postalCode'} 
                value={announce.postalCode} 
                label={'Code postal'} 
                placeholder={'ex: 33000'} 
                handleInputChange={handleInputChange}
                err={errorFields.postalCode}
            />

            <Form.InputText 
                name={'address'} 
                value={announce.address} 
                label={'Adresse complète'} 
                placeholder={'ex: 22 rue marechal josh'}
                handleInputChange={handleInputChange}
                err={errorFields.address}
            />

            <div className={'my-1 flex ' + (stepActive === 'FormStepOne'?'flex-end':'space-between')}>
                
                <button 
                    type='button'
                    className={'p-half br-half pointer mt-1 bg-gold'}
                    onClick={goNext}
                > <h3>suivant</h3></button>

            </div>
        </>
    );
}

export default FormStepOne;