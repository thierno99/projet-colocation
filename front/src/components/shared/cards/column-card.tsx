import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { ImLocation } from 'react-icons/im';
import { AiOutlineMail } from 'react-icons/ai';

import defaultProfile from '../../../assets/Images/defaultProfile.jpg';
import defaultApt from '../../../assets/Images/Appart_2.jpeg';
import { formatLongText, replaceDotDot } from '../../../_utils/functions/functions';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdVerified } from 'react-icons/md';

const ColumnCard = () => {
    return (
        <div className='flex column'>
            <div className='card relative border-1 p-half br-1'>
                <div className="card-hearder relative">
                    <img src={defaultApt} alt="profile" />
                    <hr />
                    <div className="absolute top-0 right-0 p-1 bg-light-blue">
                        <h3>700€</h3>
                    </div>

                    <div className="absolute bottom-0 left-0 mb-1 ml-half">
                        <img src={defaultProfile} alt="profile" className='small-card-profile-img br-1'/>
                    </div>
                </div>
                <div className='card-body p-half'>
                    <h3 className="card-title">
                        Appartement T3
                    </h3>
                    <p className='pt-1'>
                        {
                            formatLongText(replaceDotDot(`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,70),3).map((des,i) => {
                                return <p key={i}>{des} <br/> </p>
                            })
                        }
                        
                    </p>
                    <p className='py-half'>
                        <ImLocation
                        color='green'/> Bordeaux
                    </p>

                    <p className='py-half'>
                        <FaCalendarAlt
                        color='tomato'/> Il 4 jours
                    </p>
                </div>
                <div className='card-footer'>
                    <div className="flex space-around">

                        <div className='px-1 py-half mt-half flex center br-half border-1 text-center pointer' id='type'>
                            <AiOutlineMail
                                color='#042054'
                                fontSize={20}
                            />
                        </div>
                        <div className='px-1 py-half mt-half flex center br-half border-1 text-center pointer' id='type'>
                            <MdVerified
                                color='#25d0b4f9'
                                fontSize={20}
                            />
                        </div>
                        <div className='px-1 py-half mt-half flex center br-half border-1 text-center pointer' id='type'>
                            <BsFillTelephoneFill
                                color='green'
                                fontSize={20}
                            />
                        </div>

                    </div>
                </div>
            </div>
        
        </div>
    );
}

export default ColumnCard;