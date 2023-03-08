import React, { useEffect, useState } from 'react';

import { ImLocation } from 'react-icons/im';
import { MdVerified } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';
import { FaCalendarAlt } from 'react-icons/fa';
import { BsFillTelephoneFill } from 'react-icons/bs';

import defaultpng from '../../assets/Images/defaultpng.png';
import defaultProfile from '../../assets/Images/defaultProfile.jpg';
import { publishedAtFormatMsg } from '../../_utils/functions/functions';
import { useAppDispatch } from '../../store/store';
import { detailAnnounce } from '../../store/actions/announce-action';
import { Room } from '../../_utils/model/rooms-model';
import { RoomsInterface } from './../../_utils/model/rooms-model';
import { useParams } from 'react-router';
import AnnounceService from '../../services/announce-service';
import { User } from '../../_utils/model/user-model';
import UserServices from '../../services/user.service';
import { CandidacyDto } from '../../_utils/model/dto/CandidacyDto';
import CandidacyService from '../../services/candidacy.service';
const HandleLocation = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const announceId = id !== null ? id as string : "";
    const [announce, setAnnounce] = useState(null as unknown as RoomsInterface);
    const [user, setUser] = useState(null as unknown as User);
    useEffect(() => {
        
        dispatch(detailAnnounce(announceId));
        AnnounceService.getAnnouncementById(announceId).then((res) => {
            const announcementValue= new Room(
                res.id,
                res.title,
                res.description,
                res.ownerId,
                res.state,
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
                res.genderSearched,
                res.images,
            )

            setAnnounce(announcementValue);
            setActiveImg(announcementValue.principalPicture);
            
            UserServices.getUserById(res.ownerId).then((userInfo) => {
                let user = new User(
                    userInfo.lastname,
                    userInfo.firstname,
                    userInfo.sexe,
                    userInfo.dateOfBirth,
                    userInfo.phoneNumber,
                    userInfo.email,
                    userInfo.password,
                    userInfo.isEmailVerified,
                    userInfo.iscertified,
                    userInfo.profileImg,
                    userInfo.autorizeHaldleTel,
                    userInfo.autorizeHaldleEmail,
                    userInfo.roles
                );
                user.id = res.ownerId;
                setUser(user);
            })

        })
    }, [announceId, dispatch]);

    const [activeImg, setActiveImg] = useState(announce?.principalPicture);


    const sendCandidacy = () => {
        const candidacy = new CandidacyDto(
            announce.id,
            announce.ownerId,
            localStorage.getItem('userId') as string,
            "ENCOURS"
        )
        console.info("posting candidacy ....");
        CandidacyService.saveCandidacy(candidacy)
        .then(() => {
            console.info("posted");
        })
        .catch((err) => {
            console.info("some problem occured when posting");
            console.error(err);
        })
    }


    return (
        <div className='container relative mb-2'>
            {
                announce!==null &&
                <>

                    <div className="flex  center my-half text-primary shadow announce-head">
                        {/* <img src={`data:image/png;base64,${announce.principalPicture}`} alt={announce.title} /> */}
                        <img src={!user?.profileImg? defaultProfile: `data:image/png;base64,${user?.profileImg}`} alt="profile" className='br-1  m-1 rounded-full small-circle-img'/>
                        <h2>{user?.firstname+" "+ user?.lastname}</h2>
                    </div>
                    
                    <div className='flex reative wrap center shadow my-1'>
                        <div className='relative pt-1 w-half'>
                            
                            <img src={!announce.principalPicture?defaultpng: `data:image/png;base64,${activeImg}`} alt="profile" className='img-md w-full'/>
                            
                            
                            <div className="absolute flex wrap bottom-0 m-half w-full relative">
                                {
                                    announce.principalPicture &&
                                    <img src={`data:image/png;base64,${announce?.principalPicture}`} alt="view" className='m-b-half mx-half small-img' onClick={()=> setActiveImg(announce.principalPicture)}/>
                                }
                                {
                                    announce.images.map((image, i) => 
                                        <img src={`data:image/png;base64,${image}`} alt="view" className='m-b-half mx-half small-img' onClick={()=> setActiveImg(image)} key={i}/>
                                    )
                                }
                            </div>
                        </div>
                        <div className='p-half w-half'>
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
                                <strong>message de {user?.firstname} : </strong>
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
                            {
                                localStorage.getItem('userId')!== announce.ownerId &&
                                <button className='p-half br-half pointer mt-half bg-light-gold bold absolute bottom-0 right-0' onClick={()=>sendCandidacy()}> 
                                    Adresser ma candidature
                                </button>
                            }
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default HandleLocation;