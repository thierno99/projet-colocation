import React, { useEffect, useState } from 'react';
import { FcManager } from "react-icons/fc";
import { ImFinder } from "react-icons/im";
import { TfiAnnouncement } from "react-icons/tfi";
import { useDispatch, useSelector } from 'react-redux';
import AnnounceService from '../../../services/announce-service';
import { getMockUser } from '../../../services/user.service';
import { getAnnouncementsBetween } from '../../../store/actions/announce-action';
import { RootState, useAppDispatch } from '../../../store/store';
import { Room, RoomsInterface } from '../../../_utils/model/rooms-model';
import RowCard from "../../shared/cards/row-card";
import { CardProps } from "../../shared/Interfaces";

const SampleAnnouncement = () => {
    const dispatch = useAppDispatch();
    const announceLocationList = useSelector((state: RootState) => state.announceLocationList);
    const {announceList} = announceLocationList;
    const [announces, setAnnounces] = useState([] as RoomsInterface[]);

    // console.info(AnnounceService.getAnnouncementsBetween(1,10));
    
    useEffect(() => {
        dispatch(getAnnouncementsBetween(1,5));
        (announceList as Promise<RoomsInterface[]> ).then(res => {setAnnounces(res)});

        AnnounceService.getAnnouncementsBetween(1, 3)
        .then((res) => {
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
        .catch((err) => {
            console.error(err);
        })

        
    }, [announceList, dispatch])
    
    const announceLocations = useSelector((state: RootState) => state.AnnouncementsBetween);
    console.info(announceLocations);
  const services: CardProps[] = [
    {
        image: <ImFinder fontSize={100} color={'pink'}/>,
        title: "Richard, 35 ans",
        description: "Vous avez la possibilité de voir toutes les propositons de logement à votre proximité..",// de logement à votre proximité
        urlStr:''
    },

    {
        image: <TfiAnnouncement fontSize={100} color={'brown'}/>,
        title: "Zoé, 23 ans",
        description: "Vous avez la possibilité de publier des annonces de logement.",
        urlStr: ''
    },

    {
        image: <FcManager fontSize={100} color={'brown'}/>,
        title: "Michelle, 28 ans",
        description: `Vous avez la possibilité de gerer vos factures, vos tâches, contacter le proprio ...`, // vos tâches, contacter le proprio
        urlStr: ''
    },
];
return (
    <div className='flex space-between wrap my-3 w-100'>
        {
            announces.map((anounce) => {
                const user = getMockUser("1");
                return <RowCard 
                    image={ user?.profileImg===""? user?.profileImg : <ImFinder fontSize={100} color={'pink'}/>} 
                    title={user?.firstname + ' ' + user?.lastname} 
                    description={anounce.description}
                    key={anounce.id}
                    urlStr={"/app/rooms/"+ anounce.id} 
                />
            })
        }
    </div>
);
}

export default SampleAnnouncement;