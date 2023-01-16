
import { ChangeEvent, FC } from 'react';

import Form from '../shared/forms/forms';
import { FormStepProps } from './form-step-one';

const FormStepTwo: FC<FormStepProps> = (props) => {
    const { announce, stepActive, setStepActive, setAnnounce } = props;
    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAnnounce({
            ...announce,
            [e.target.name]: e.target.value
        })
    }

    console.log(announce)
    return (
        <>
            <h3 className='text-center my-1'>Information sur le logement</h3>
            <div className='my-half flex column'>
                <fieldset className='br-half'>
                    <legend><strong>Coloc Récherché(e)s:</strong></legend>
                    <Form.Checkbox name={'homme'} label={'Homme'}/>
                    <Form.Checkbox name={'femme'} label={'Femme'}/>
                </fieldset>
            </div>

            <div className='my-half flex column'>
                <fieldset className='br-half'>
                    <legend><strong>Type de colocation:</strong></legend>
                    <Form.Checkbox name={'appart'} label={'Appartement'}/>
                    <Form.Checkbox name={'maison'} label={'Maison'}/>
                    <Form.Checkbox name={'studio'} label={'Studio'}/>
                </fieldset>
            </div>

            <div className='my-half flex column'>
                <fieldset className='br-half'>
                    <legend> <strong>Etat de la Localité:</strong></legend>
                    <Form.Checkbox name={'notFournished'} label={'Non Meublé'}/>
                    <Form.Checkbox name={'fournished'} label={'Meublé'}/>
                </fieldset>
            </div>

            <Form.InputNumber 
                name={'price'} 
                value={''} 
                label={'Prix'} 
                placeholder={'ex: 800'}
                handleInputChange={handleInputChange}
                err={{ hasError:false, errMsg:''}}
            />

            <Form.InputNumber 
                name={'nbRoomatesSeached'} 
                value={''} 
                label={'Nombre de colocs Récherchés'} 
                placeholder={'ex: 3'}
                handleInputChange={handleInputChange}
                err={{ hasError:false, errMsg:''}}
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
                    onClick={() => setStepActive('FormStepThree')}
                > <h3>suivant</h3></button>

            </div>
        </>
    );
}

export default FormStepTwo;