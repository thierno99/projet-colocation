
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
    title: string;
    to: string;
    classes: string[];
}

export const ButtonPrimary: FC<ButtonProps> = (props) => {
    const navigate = useNavigate();
    const {title,to,classes} = props;
    return(
        <button className={'p-1  mb-1 pointer text-primary shadow '+classes.join(' ')}
            onClick = {()=>navigate(to)}
        > <h2> {title} </h2></button>
    );
}

