import React, { FC, useEffect, useState } from 'react';
import { BiMessageRounded } from 'react-icons/bi';
import AccountServices from '../../services/account.service';
import RoomateService from '../../services/roomate.service';
import UserServices from '../../services/user.service';
import { RoomateResDto } from '../../_utils/model/dto/roomateResDto';
import defaultpng from '../../assets/Images/defaultpng.png';
import { UserResDto } from '../../_utils/model/dto/userResDto';

const ShowRoomates:FC<any> = (props) =>{
    const [userInfo, setUerInfo] = useState(null as unknown as UserResDto);
    const [roomates, setRoomates] = useState(null as unknown as RoomateResDto)
    const userId = (localStorage.getItem('userId') as string);
    const [noRoomates, setNoRoomates] = useState("");
    useEffect(() => {

        UserServices.getUserById(userId).then((user) => {
            let usr = new UserResDto(
                user.id,
                user.lastname,
                user.firstname,
                user.sexe,
                user.dateOfBirth,
                user.phoneNumber,
                user.email,
                user.password,
                user.isEmailVerified,
                user.iscertified,
                user.profileImg,
                user.autorizeHaldleTel,
                user.autorizeHaldleEmail,
                user.roles
            );
            usr.id = userId;
            setUerInfo(usr);
        }).catch(error => {
            if(error.code === "ERR_NETWORK") {
                AccountServices.logout();
            }
        })

        if(userInfo?.id && userInfo?.id !== "null") {
            RoomateService.getRoomateByUserId(userInfo?.id)
            .then((res) => { 
                if(res) {
                    console.info(res);
                    let users: UserResDto[] = []; 
                    res.roomates.forEach((usr:any) => users.push(
                        new UserResDto(
                            usr.id,
                            usr.lastname,
                            usr.firstname,
                            usr.sexe,
                            usr.dateOfBirth,
                            usr.phoneNumber,
                            usr.email,
                            usr.password,
                            usr.isEmailVerified,
                            usr.iscertified,
                            usr.profileImg,
                            usr.autorizeHaldleTel,
                            usr.autorizeHaldleEmail,
                            usr.roles
                        ) 
                    ));
    
                    const roomatesTmp = new RoomateResDto(res.id, res.manager, res.announce,users);
                    console.log(roomatesTmp);
                    setNoRoomates("");
                    setRoomates(roomatesTmp);
                }else {
                    setNoRoomates("Vous n'avez pas de Colocataire pour le moment");
                }
            })
            .catch(error => {
                console.log(error);
                if(error.code === "ERR_NETWORK") {
                    AccountServices.logout();
                }
            })

        }

    }, [userId, userInfo?.id]);
    return (
        <div className='container'>
            <h2 className='text-center p-1'>Vos Colocs</h2>
            {
                noRoomates===""? 
                <table className='table w-100'>
                    <thead>
                        <tr>
                            <th className='relative'>profile</th>
                            
                            <th>nom usuel</th>

                            <th>contact</th>
                            
                            <th>contacter</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            roomates?.roomates?.map(roomate =>{
                                console.log("---",roomate, userId)
                                if(roomate.id !== roomates.manager?.id && roomate.id!==userId){
                                    return (
                                        <tr>
                                            <td>
                                                <img 
                                                    src={roomates.manager?.profileImg?`data:image/png;base64,${roomate.profileImg}`:defaultpng} 
                                                    alt={roomate.firstname} 
                                                    className="mini-img rounded-full"
                                                />
                                            </td>
                                            <td>
                                                {roomate.firstname}
                                            </td>

                                            <td>
                                                {roomate.phoneNumber}
                                            </td>
                                            <td className='pointer'>
                                                <BiMessageRounded fontSize={20} color={'#1276ff'}/>
                                            </td>
                                        </tr>
                                    )
                                }
                            }
                            )
                        }

                        
                    </tbody>
                </table>
                :
                <h4 className='text-center p-1'>{noRoomates}</h4>
            }

            {
                noRoomates===""? 
                <div className='w-100 my-2'>
                    <h2 className='text-center'>Proprio</h2>
                    <table className='table w-100 my-2'>
                        <thead>
                            <tr>
                                <th className='relative'>profile</th>
                                
                                <th>nom usuel</th>

                                <th>contact</th>
                                
                                <th>contacter</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                (roomates?.manager && roomates.manager?.id !== userId) &&
                                <tr>
                                    <td>
                                        <img 
                                            src={roomates.manager?.profileImg?`data:image/png;base64,${roomates.manager?.profileImg}`:defaultpng} 
                                            alt={roomates.manager?.firstname} 
                                            className="mini-img rounded-full"
                                        />
                                    </td>
                                    <td>
                                        {roomates.manager?.firstname}
                                    </td>

                                    <td>
                                        {roomates.manager?.phoneNumber}
                                    </td>
                                    <td className='pointer'>
                                        <BiMessageRounded fontSize={20} color={'#1276ff'}/>
                                    </td>
                                </tr>
                            }

                            
                        </tbody>
                    </table>
                </div>
                :
                <h4 className='text-center p-1'>{noRoomates}</h4>
            }
        </div>

    );
}

export default ShowRoomates;