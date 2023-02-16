import React, { ChangeEvent, FC, useState } from 'react';
export interface InputErr {
    hasError: boolean;
    errMsg: string;
}
export interface InputTextProps {
    name: string;
    value: string | number;
    label: string;
    placeholder: string;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    pattern: string;
    errorMessage: string;
    required: boolean;

}

export interface SelectFormProps {
    name: string;
    options: JSX.Element[];
    handleSelectChange: (type: string, e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface TextAreaProps {
    name: string;
    value: string;
    label: string;
    placeholder: string;
    rows: number;
    cols: number;
    handleTexteAreaChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
    pattern: string;
    errorMessage: string;
}

export interface CheckboxProps {
    name: string;
    label: string;
    checked: boolean;
    handleCheckboxChange: (field: string, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface InputRadioProps {
    name: string;
    label: string;
    value: string;
    checked: boolean;
    handleInputRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const  InputText:FC<InputTextProps> = (props) => {
    const { name, label,value, placeholder, errorMessage, pattern, required, handleInputChange} = props;

    const [focused, setFocused] = useState(false)

    return (
        <div className='my-half flex column'>
            <label htmlFor={name}> <strong>{label}</strong></label>
            <input 
                type='text' 
                id={name} 
                className='p-half mt-1 br-half' 
                placeholder={placeholder} 
                onChange={(e) =>handleInputChange(e)} name={name}
                value={value}
                pattern = {pattern}
                onBlur= {()=>setFocused(true)}
                required={required}
            />
            
            <span className={"danger py-half px-1 hide " +(focused?"toggle-err":'')}>
                {errorMessage}
            </span>
            
        </div>
    );
}

const SelectForm:FC<SelectFormProps> = (props) => {
    const { name,options, handleSelectChange } = props;
    return (
        <div className='my-half flex column'>
            <label htmlFor={name}> <strong>Departement</strong></label>
            <select 
                name={name} 
                id={name} 
                className='p-half mt-1 br-half' 
                onChange={(e) => handleSelectChange(name,e)}
                defaultValue=""
            >
                <option value="" key={""} disabled>selectionner....</option>
                {
                    options
                }
            </select>
        </div>
    )
}

const  InputNumber:FC<InputTextProps> = (props) => {

    const { name, label, value, placeholder, required,errorMessage, pattern, handleInputChange} = props;
    const [focused, setFocused] = useState(false)
    return (
        <div className='my-half flex column'>
            <label htmlFor={name}> <strong>{label}</strong></label>
            <input 
                type='number' 
                id={name} 
                className='p-half mt-1 br-half' 
                placeholder={placeholder} 
                name={name}
                value={value}
                onChange={(e) =>handleInputChange(e)}
                pattern = {pattern}
                onBlur= {()=>setFocused(true)}
                required={required}
                
            />
            <span className={"danger py-half px-1 hide " +(focused?"toggle-err":'')}>
                {errorMessage}
            </span>
        </div>
    );
}


const TextArea:FC<TextAreaProps> = (props) => {
    const {name, label,value, placeholder, cols, rows, errorMessage, handleTexteAreaChange} = props;

    return (
        <div className='my-1 flex column'>
            <label htmlFor='description'><strong>{label}</strong></label>
            <textarea 
                id={name} 
                className='p-half mt-1 br-half' 
                placeholder={placeholder}
                rows = {rows} cols= {cols}
                name={name}
                onChange={(e) =>handleTexteAreaChange(e)}
                value={value}
            >
            </textarea>
            
            <span className="danger py-half px-1 hide">
                {errorMessage}
            </span>
        </div>
    )
}

const Checkbox:FC<CheckboxProps> = (props) => {
    const { name, label,handleCheckboxChange } = props
    return (
        <div className='p-half'>
            <input type="checkbox" id={name} name={name} onChange={(e)=>handleCheckboxChange('', e)} />
            <label htmlFor={name} className='px-half'>{label}</label>
        </div>
    );
}

const InputRadio:FC<InputRadioProps> = (props) => {
    const { name, label, value, checked, handleInputRadioChange } = props;

    return (
        <div className='p-half'>
            <input type="radio" id={label} name={name} onChange={(e)=>handleInputRadioChange(e)} value={value} checked={checked}/>
            <label htmlFor={label} className='px-half'>{label}</label>
        </div>
    );
}

const  InputMail:FC<InputTextProps> = (props) => {
    const { name, label,value, placeholder, errorMessage, pattern, required, handleInputChange} = props;

    const [focused, setFocused] = useState(false)

    return (
        <div className='my-half flex column'>
            <label htmlFor={name}> <strong>{label}</strong></label>
            <input 
                type='email' 
                id={name} 
                className='p-half mt-1 br-half' 
                placeholder={placeholder} 
                onChange={(e) =>handleInputChange(e)} name={name}
                value={value}
                pattern = {pattern}
                onBlur= {()=>setFocused(true)}
                required={required}
            />
            
            <span className={"danger py-half px-1 hide " +(focused?"toggle-err":'')}>
                {errorMessage}
            </span>
            
        </div>
    );
}

const Form ={
    InputText,
    InputMail,
    SelectForm,
    InputNumber,
    TextArea,
    Checkbox,
    InputRadio,
}

export default Form;