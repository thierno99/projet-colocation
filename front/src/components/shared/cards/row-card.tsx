import React, { FC } from 'react';
import { formatLongText } from '../../../_utils/functions/functions';
import { ButtonPrimary } from '../buttons/Buttons';

import { CardProps } from "../Interfaces";

const RowCard:FC<CardProps> = (props) => {
    const {image, title, description} = props;
    return (
        <div className='row-card relative pointer w-full flex space-between wrap sm-column'>
            <div className="row-card-image flex j-center">
                {
                    typeof image === 'string' ?(
                        <img src={'../../../assets/Images/'+image} alt={image}/>
                    ):
                    (
                        image
                    )
                }
            </div>

            <div className="row-card-body">
                <h3 className="card-title">
                    {title}
                </h3>
                {
                    formatLongText(description,4).map((des,i) => {
                        return <p key={i}>{des} <br/> </p>
                    })
                }
            </div>

            <div className="row-card-bottom flex center">
                <ButtonPrimary title={'je decouvre'} to={''} classes={['bg-light-blue b-none mx-1 h-b']}/>
            </div>
        </div>
    );
}

export default RowCard;