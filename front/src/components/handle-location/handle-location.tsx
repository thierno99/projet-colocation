import React, { useEffect, useState } from 'react';

import { ImLocation } from 'react-icons/im';
import { MdVerified } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';
import { FaCalendarAlt } from 'react-icons/fa';
import { BsFillTelephoneFill } from 'react-icons/bs';

import { getMockUser } from '../../services/user.service';
import defaultpng from '../../assets/Images/defaultpng.png';
import defaultProfile from '../../assets/Images/defaultProfile.jpg';
import { publishedAtFormatMsg } from '../../_utils/functions/functions';
import { RootState, useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { detailAnnounce } from '../../store/actions/announce-action';
import { Room } from '../../_utils/model/rooms-model';
import { RoomsInterface } from './../../_utils/model/rooms-model';
import { useParams } from 'react-router';
import AnnounceService from '../../services/announce-service';
const HandleLocation = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const announceId = id !== null ? id as string : "";
    const [announce, setAnnounce] = useState(null as unknown as RoomsInterface);
    
    useEffect(() => {
        
        dispatch(detailAnnounce(announceId));
        AnnounceService.getAnnouncementById(announceId).then((res) => {
            const announcementValue= new Room(
                res.id,
                res.title,
                res.description,
                res.ownerId,
                res.city,
                res.postalCode,
                res.address,
                res.nbRoomatesSeached,
                res.publishedAt,
                res.price,
                res.principalPicture,
                res.announceType,
                res.isOwnerCertified,
                res.roomType,
                res.roomfurnishedType,
                res.genderSearched
            )
            setAnnounce(announcementValue);
        })
    }, [announceId, dispatch]);
    
    const user= getMockUser(announce?.ownerId);
    const [activeImg, setActiveImg] = useState(announce?.principalPicture);
    const x = useSelector((state: RootState) => state.announcementDetail);
    return (
        <div className='container relative mb-2'>
            {
                announce!==null &&
                <>

                    <div className="flex  center my-half text-primary shadow announce-head">
                        <img src={!user?.profileImg? defaultProfile: '/Images/'+user.profileImg} alt="profile" className='br-1 small-img m-1'/>
                        <h2>{announce.title}</h2>
                    </div>
                    
                    <div className='flex reative wrap center shadow my-1'>
                        <div className='relative pt-1'>
                            <img src={!announce.principalPicture?defaultpng: '/Images/'+activeImg} alt="profile mx-half" className='img-md'/>
                            <div className="absolute flex wrap bottom-0 m-half">
                                <img src={defaultpng} alt="" className='m-b-half mx-half small-img pointer' onClick={()=> setActiveImg('defaultpng.png')}/>
                                <img src={!announce.principalPicture?defaultpng: '/Images/'+announce.principalPicture} alt="" className='m-b-half mx-half small-img' onClick={()=> setActiveImg(!announce.principalPicture?'defaultpng.png': announce.principalPicture)}/>
                                <img src={defaultpng} alt="" className='m-b-half mx-half small-img'/>
                                <img src={defaultpng} alt="" className='m-b-half mx-half small-img'/>
                            </div>
                        </div>
                        <div className='p-half'>
                            {
                                announce.city?
                                    <p className='py-half'>
                                        <ImLocation
                                        color='green'/> {announce.city}
                                    </p>
                                    :
                                    null
                            }
                            
                            {
                                announce.publishedAt?
                                (

                                    <div className='py-half flex items-center'>
                                            <FaCalendarAlt
                                            color='blue'/> 
                                            <p className='text-center pl-half'>
                                                {publishedAtFormatMsg(announce.publishedAt)}
                                            </p>
                                    </div>
                                    
                                ):
                                null
                            }
                            <p className='p-half'><strong>type de propeiété: </strong>{announce.roomType}</p>
                            <p className='p-half'><strong>locataires cherchés: </strong> {announce.nbRoomatesSeached}</p>
                            <p className='p-half'><strong>Loyer: </strong>{announce.price} €</p>
                            <p className='p-half'><strong>genres: </strong>{announce.genderSearched.join(', ')}</p>
                            
                            <div className='p-half'>
                                <strong>message de {user?.prenom} : </strong>
                                <p className='p-half'>{announce.description}</p>
                            </div>

                            <div className='mt-1 mb-2'>
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
                            <button className='p-half br-half pointer mt-half bg-light-gold bold absolute bottom-0 right-0'> 
                                Adresser ma candidature
                            </button>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default HandleLocation;