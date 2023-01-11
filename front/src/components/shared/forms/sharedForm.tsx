import React, { FC, ReactElement } from "react";


export interface FormFieldProps {
    label: ReactElement<any, any>,
    field: ReactElement<any, any>
}

export interface ShardFormProps {
    button: {name: string, link: string},
    fields: FormFieldProps[];
}

const ShardForm: FC<ShardFormProps> = (props) => {

    const {button, fields} = props;

    const onSubmit = (e: Event) => {
        e.preventDefault();
        console.log(e)

    }

    return (

        <form className='flex column m-1 p-1' onSubmit={(e)=>onSubmit}>
            {
                fields.map ((field,i) => {
                    return(
                        <div className='my-half flex column' key={i}>
                            {field.label}
                            {field.field}
                        </div>
                    )
                })
            }

            <div className='my-1 flex column'>
                <button className='p-half br-half pointer mt-1 bg-primary text-light'> <h3>{button.name}</h3></button>
            </div>
        </form>
    );
}

export default ShardForm;