
import { FC } from 'react';

interface ButtonProps {
    title: string;
    to: string;
    classes: string[];
}

export const ButtonPrimary: FC<ButtonProps> = (props) => {
    const {title,classes} = props;
    return(
        <button className={'p-1  mb-1 pointer text-primary '+classes.join(' ')}> <h2> {title} </h2></button>
    );
}

