import React, { FC } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { ImLocation } from 'react-icons/im';
import { AiOutlineMail } from 'react-icons/ai';

import defaultProfile from '../../../assets/Images/defaultProfile.jpg';
import defaultpng from '../../../assets/Images/defaultpng.png';
import { formatLongText, publishedAtFormatMsg, replaceDotDot } from '../../../_utils/functions/functions';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdVerified } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/store';
import { detailAnnounce } from '../../../store/actions/announce-action';

const ColumnCard:FC<any> = (props) => {
    const dispatch = useAppDispatch();
    const {cardValues, user, announceId} = props;
    const navigate = useNavigate();
    
    console.table(cardValues);
    return (
        <div className='flex column my-1'>
            <div className='card relative border-1 p-half br-1' onClick={() => { dispatch(detailAnnounce(announceId)); navigate("/app/rooms/"+announceId);} }>
                <div className="card-hearder relative">
                    <img src={!cardValues.principalPicture?defaultpng: `data:image/png;base64,${cardValues.principalPicture}`} alt="profile" />
                    <hr />
                    {
                        cardValues.price?
                            <div className="absolute top-0 right-0 p-1 bg-light-blue">
                                <h3>{cardValues.price} €</h3>
                            </div>
                        :
                        null
                    }
                    {
                        user ?(
                            <div className="absolute bottom-0 left-0 mb-1 ml-half">
                                <img src={!user.profileImg? defaultProfile: '/Images/'+user.profileImg} alt="profile" className='small-card-profile-img br-1'/>
                            </div>
                        ):
                        null
                    }
                </div>
                <div className='card-body p-half'>
                    <h3 className="card-title">
                        {cardValues.title}
                    </h3>
                    <div className='pt-1'>
                        {
                            formatLongText(replaceDotDot(cardValues.description,70),4).map((des,i) => {
                                return <p key={i}>{des} <br/> </p>
                            })
                        }
                        
                    </div>
                    {
                        cardValues.city?
                            <p className='py-half'>
                                <ImLocation
                                color='green'/> {cardValues.city}
                            </p>
                            :
                            null
                    }

                    {
                        cardValues.publishedAt?
                        (

                            <div className='py-half flex items-center'>
                                    <FaCalendarAlt
                                    color='blue'/> 
                                    <p className='text-center pl-half'>
                                        {publishedAtFormatMsg(cardValues.publishedAt)}
                                    </p>
                            </div>
                            
                        ):
                        null
                    }

                </div>
                <div className='card-footer'>
                    {
                        user?(
                        <>
                            {
                                user.iscertified?(
                                    <div className="flex space-around">
                                        {
                                            user.autorizeHaldleTel ?
                                            <div className='px-1 py-half mt-half flex center br-half border-1 text-center pointer'>
                                                <BsFillTelephoneFill
                                                    color='green'
                                                    fontSize={20}
                                                />
                                            </div>
                                            :null

                                        }
                                        {
                                        user.autorizeHaldleEmail ?
                                            <div className='px-1 py-half mt-half flex center br-half border-1 text-center pointer'>
                                                <AiOutlineMail
                                                    color='#042054'
                                                    fontSize={20}
                                                />
                                            </div>
                                            :null
                                        }
                                        {
                                            <div className='px-1 py-half mt-half flex center br-half border-1 text-center pointer'>
                                                <MdVerified
                                                    color='#25d0b4f9'
                                                    fontSize={20}
                                                />
                                            </div>
                                        }
                                    </div>
                                )
                                : 
                                <div className='px-1 py-half mt-half flex center br-half border-1 text-center pointer'>
                                    <MdVerified
                                        color='red'
                                        fontSize={20}
                                    />
                                </div>
                            }
                        </>
                        ):
                        null
                    }

                </div>
            </div>
        
        </div>
    );
}

export default ColumnCard;