
import { ChangeEvent, FC, useState } from 'react';
import { POSTAL_ADDRESS_REG, POSTAL_CODE_REG, TTITLE_REG } from '../../constants/regex';
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
    
    const [erroeMessage, setErroeMessage] = useState('');

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
    
    const isValidForm = () => {
        if(
            !TTITLE_REG.test(announce.title) ||
            !POSTAL_ADDRESS_REG.test(announce.address) ||
            !POSTAL_CODE_REG.test(announce.postalCode)
        ) {
            return false;
        }
        return true;
    }
    
    const goNext = () => {
        if(isValidForm()) {
            setStepActive("FormStepTwo");
        } else {
            setErroeMessage("Veillez remplir correctement tous les champs svp !")
        }
    }

    
    return (
        <>
            {
                erroeMessage && 
                <div className="danger p-1">
                    {erroeMessage}
                </div>
            }
            
            <Form.InputText 
                name="title" 
                value={announce.title} 
                label={"nom de l'annonce"} 
                placeholder={'ex: je mets une partie de ma maison en location'} 
                handleInputChange={handleInputChange}
                pattern="^(.|\s)*[a-zA-Z]+(.|\s){5,}$"
                errorMessage='Titre trop court'
                required={true}
            />

            <Form.TextArea 
                name = {'description'}
                value = {announce.description}
                label = {'Description'}
                placeholder = {"Ajoutez une petite description sur votre annonce pour plus d'informations"}
                rows = {5} 
                cols= {33}
                handleTexteAreaChange={handleTexteAreaChange}
                pattern='^(.|\s)*[a-zA-Z]+(.|\s)*$'
                errorMessage='veillez remplir correctement ce champs svp'
            />


            <Form.SelectForm 
                label='Departement'
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
                handleSelectChange ={handleSelectChange}
            />

            <Form.SelectForm 
                label='Ville'
                name ={'city'}
                options={
                    getCitiesOfDepartement('FR', announce.state).map((city,i)=>  (
                        <option value={city.name} key={city.name} selected={city.name===announce.city}> {city.name}</option>
                    ))
                }
                handleSelectChange ={handleSelectChange}
            />

            <Form.InputText 
                name={'postalCode'} 
                value={announce.postalCode} 
                label={'Code postal'} 
                placeholder={'ex: 33000'} 
                handleInputChange={handleInputChange}
                pattern = '^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$'
                errorMessage='code postal invalid'
                required={true}
            />

            <Form.InputText 
                name={'address'} 
                value={announce.address} 
                label={'Adresse complète'} 
                placeholder={'ex: 22 rue marechal josh'}
                handleInputChange={handleInputChange}
                pattern='^\s*\S+(?:\s+\S+){2,}'
                errorMessage='adresse invalid'
                required={true}
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