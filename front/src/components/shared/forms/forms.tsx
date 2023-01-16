import React, { ChangeEvent, FC } from 'react';
export interface InputErr {
    hasError: boolean;
    errMsg: string;
}
export interface InputTextProps {
    name: string;
    value: string;
    label: string;
    placeholder: string;
    err:InputErr;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void

}

export interface SelectFormProps {
    name: string;
    options: JSX.Element[];
    err:InputErr;
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
    err:InputErr;
}

export interface CheckboxProps {
    name: string;
    label: string;
}

const  InputText:FC<InputTextProps> = (props) => {
    const { name, label,value, placeholder, err, handleInputChange} = props;
    console.log("-------------------------------------------------")
    console.log(err)
    console.log("-------------------------------------------------")
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
            />
            {
                err.hasError && <div className="danger py-half br-half px-1">
                    {err.errMsg}
                </div>
            }
        </div>
    );
}

const SelectForm:FC<SelectFormProps> = (props) => {
    const { name,options, err, handleSelectChange } = props;
    return (
        <div className='my-half flex column'>
            <label htmlFor={name}> <strong>Departement</strong></label>
            <select name={name} id={name} className='p-half mt-1 br-half' onChange={(e) => handleSelectChange(name,e)}>
                <option value="" key={""}>--select--</option>
                {
                    options
                }
            </select>
            
            {
                err.hasError && <div className="danger py-half br-half px-1">
                    {err.hasError}
                </div>
            }
        </div>
    )
}

const  InputNumber:FC<InputTextProps> = (props) => {

    const { name, label, value, placeholder, err, handleInputChange} = props;
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
            />
            {
                err.hasError && <div className="danger py-half br-half px-1">
                    {err.hasError}
                </div>
            }
        </div>
    );
}


const TextArea:FC<TextAreaProps> = (props) => {
    const {name, label,value, placeholder, cols, rows, err, handleTexteAreaChange} = props;

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

            {
                err.hasError && <div className="danger py-half br-half px-1">
                    {err.hasError}
                </div>
            }
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
    SelectForm,
    InputNumber,
    TextArea,
    Checkbox,
}

export default Form;