
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AiFillDelete, AiFillEdit, AiOutlineReload } from 'react-icons/ai';

import AnnounceService from '../../services/announce-service';
import UserServices from '../../services/user.service';
import { UserAnnouncesAction } from '../../store/actions/user-action';
import { useAppDispatch } from '../../store/store';
import { replaceDotDot } from '../../_utils/functions/functions';
import { Room, RoomsInterface } from '../../_utils/model/rooms-model';

const ShowAnnounces:FC<any> = (props) => {
    const { userInfo } = props;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [announces, setAnnounces] = useState([] as RoomsInterface[]);
    const [successMsg, setSuccessMsg] = useState("");
    useEffect(() => {
        
        dispatch(UserAnnouncesAction(localStorage.getItem('userId') as string));
        UserServices.getUserAnnounces(userInfo?.id).then((res) => {
            let rooms: RoomsInterface[] = [];
            res.forEach((room: any) => {
                rooms.push(new Room(
                    room.id,
                    room.title,
                    room.description,
                    room.ownerId,
                    room.state,
                    room.city,
                    room.postalCode,
                    room.address,
                    room.nbRoomatesSeached,
                    room.publishedAt,
                    room.price,
                    room.principalPicture,
                    room.announceType,
                    room.ownerCertified,
                    room.roomType,
                    room.roomfurnishedType,
                    room.genderSearched
                ));
            });

            setAnnounces(rooms);

        })
    }, [dispatch, userInfo?.id]);

    const delteAnnounce = (announceId: string) => {
        const confirm = window.confirm("êtes vous sur de vouloir supprimer cette annonce ?");

        if(confirm) {
            console.log("deleting annonce ....");

            AnnounceService.deleteAnnounceById(announceId)
            .then(() => {
                setSuccessMsg("Announce Supprimer avec succès");
                console.info("annonce deleted successfully")
            })
            .catch(() => console.error("announce not deleted successfully! try again"));
        }
    }
    return (
        <div className="mx-auto  relative border-1 br-1 w-half flex column mw-220 mt-half overflow-scroll p-card">
            <h4 className='text-center py-1'>Announce</h4>

            <div className="flex column center w-100 relative">
                {
                    successMsg!=="" &&
                    <div className="text-center success w-full p-1 flex space-around">
                        {successMsg}
                        <button className='bg-none border-1 p-1 flex center'
                            onClick={()=> window.location.reload()}
                        >
                            <h4>
                                rafraichir
                            </h4>
                            <AiOutlineReload fontSize={30}/>
                        </button>
                    </div>
                }
                <div className='w-full my-1'>
                    {
                        announces.length === 0 ?
                            <h5 className='text-center text-gray'>Aucune announce Pour le moment</h5>
                        :
                        <table className='table w-100'>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    
                                    <th>nom</th>

                                    <th>edit</th>

                                    <th>del</th>
                                    
                                    <th>détails</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    announces.map((announce,i) => 
                                        <tr key={announce.id}>
                                            <td>{replaceDotDot(announce.id,10)}</td>
                                            <td>{replaceDotDot(announce.title,10)}</td>
                                            <td>
                                                <button className='px-1 bg-light-gold border-1' onClick={()=>navigate("/app/room/edit-announce/"+announce.id)}> <AiFillEdit/> </button>
                                            </td>
                                            <td>
                                                <button className='px-1 danger border-1' onClick={()=>delteAnnounce(announce.id)}><AiFillDelete/></button>
                                            </td>
                                            <td>
                                                <button className='px-1 border-1' onClick={()=>navigate("/app/rooms/"+announce.id)}>details</button>
                                            </td>
                                        </tr>
                                        
                                    )
                                    

                                }
                            </tbody>
                        </table>
                    }
                </div>

                <div className="flex w-100 center">

                    <button className="mr-half w-half btn bg-light-gold w-full py-half px-1 my-1" onClick={() => navigate('/app/rooms/make-announce')}>
                        Proposer
                    </button>
                </div>
                
            </div>

        </div>
    );
}

export default ShowAnnounces;