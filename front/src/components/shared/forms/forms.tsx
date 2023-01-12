import React, { FC } from 'react';
export interface InputTextProps {
    name: string;
    value: string;
    label: string;
    placeholder: string;
}

export interface TextAreaProps {
    name: string;
    value: string;
    label: string;
    placeholder: string;
    rows: number;
    cols: number;
}

export interface CheckboxProps {
    name: string;
    label: string;
}

const  InputText:FC<InputTextProps> = (props) => {
    const { name, label, placeholder} = props;
    return (
        <div className='my-half flex column'>
            <label htmlFor='city'> <strong>{label}</strong></label>
            <input 
                type='text' id={name} className='p-half mt-1 br-half' placeholder={placeholder}
            />
        </div>
    );
}

const  InputNumber:FC<InputTextProps> = (props) => {

    const { name, label, placeholder} = props;
    return (
        <div className='my-half flex column'>
            <label htmlFor='city'> <strong>{label}</strong></label>
            <input 
                type='number' id={name} className='p-half mt-1 br-half' placeholder={placeholder}
            />
        </div>
    );
}


const TextArea:FC<TextAreaProps> = (props) => {
    const {name, label, placeholder, cols, rows} = props;

    return (
        <div className='my-1 flex column'>
            <label htmlFor='description'><strong>{label}</strong></label>
            <textarea 
                id={name} 
                className='p-half mt-1 br-half' 
                placeholder={placeholder}
                rows = {rows} cols= {cols}
            >
            </textarea> 
        </div>
    )
}

const Checkbox:FC<CheckboxProps> = (props) => {
    const { name, label } = props
    return (
        <div className='p-half'>
            <input type="checkbox" id={name} name={name}/>
            <label htmlFor={name} className='px-half'>{label}</label>
        </div>
    );
}

const Form ={
    InputText,
    InputNumber,
    TextArea,
    Checkbox,
}

export default Form;