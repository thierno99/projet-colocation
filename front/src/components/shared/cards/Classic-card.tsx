import { FC } from 'react';
import { formatLongText } from '../../../functions/functions';

import { CardProps } from "../Interfaces";

const ClassicCard:FC<CardProps> = (props) => {
    const {image, title, description} = props;
    return (
        <div className='classic-card relative pointer sm-column'>
            <div className="classic-card-image flex j-center w-full">
                {
                    typeof image === 'string' ?(
                        <img src={'../../../assets/Images/'+image} alt={image}/>
                    ):
                    (
                        image
                    )
                }
            </div>

            <div className="classic-card-body">
                <h3 className="card-title">
                    {title}
                </h3>

                {
                    
                }
                    {
                        formatLongText(description,4).map((des,i) => {
                            return <p key={i}>{des} <br/> </p>
                        })
                    }
            </div>

            <div className="classic-car-bottom">

            </div>
        </div>
    );
}

export default ClassicCard;