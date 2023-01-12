
import { FC } from 'react';

import Form from '../shared/forms/forms';

export interface FormStepProps {
    stepActive: string;
    setStepActive:  (sa: string) => void;
}

const FormStepOne: FC<FormStepProps> = (props) => {
    const { stepActive, setStepActive } = props;
    return (
        <>

            <Form.InputText name={'title'} value={''} label={"nom de l'annonce"} placeholder={'ex: je mets une partie de ma maison en location'}/>

            <Form.TextArea 
                name = {'description'}
                value = {''}
                label = {'Description'}
                placeholder = {"Ajoutez une petite description sur votre annonce pour plus d'informations"}
                rows = {5} 
                cols= {33}
            />

            <Form.InputText name={'city'} value={''} label={'Ville'} placeholder={'ex: Bordeaux'}/>

            <Form.InputText name={'postalCode'} value={''} label={'Code postal'} placeholder={'ex: 33000'}/>

            <Form.InputText name={'postalCode'} value={''} label={'Adresse complète'} placeholder={'ex: 22 rue marechal josh'}/>

            <div className={'my-1 flex ' + (stepActive === 'FormStepOne'?'flex-end':'space-between')}>
                
                <button 
                    className={'p-half br-half pointer mt-1 bg-gold'}
                    onClick={() => setStepActive('FormStepTwo')}
                > <h3>suivant</h3></button>

            </div>
        </>
    );
}

export default FormStepOne;