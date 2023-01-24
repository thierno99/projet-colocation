import React, { FC, ReactElement } from "react";


export interface FormFieldProps {
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
                            {field.field}
                        </div>
                    )
                })
            }

            <div className='flex column center mt-1'>
                <button className='button-login p-half br-1 pointer text-light-grey bg-opactity b-none'> <h3>{button.name}</h3></button>
            </div>
        </form>
    );
}

export default ShardForm;