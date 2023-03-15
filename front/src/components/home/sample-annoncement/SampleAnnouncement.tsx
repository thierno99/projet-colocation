import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AnnounceService from '../../../services/announce-service';
import { getAnnouncementsBetween } from '../../../store/actions/announce-action';
import { RootState, useAppDispatch } from '../../../store/store';
import { Room, RoomsInterface } from '../../../_utils/model/rooms-model';
import RowCard from "../../shared/cards/row-card";

const SampleAnnouncement = () => {
    const dispatch = useAppDispatch();
    const announceLocationList = useSelector((state: RootState) => state.announceLocationList);
    const {announceList} = announceLocationList;
    const [announces, setAnnounces] = useState([] as RoomsInterface[]);
    useEffect(() => {
        dispatch(getAnnouncementsBetween(1,5));

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
    
return (
    <div className='flex space-between wrap my-3 w-100'>
        {
            announces.map((anounce) => {
                return <RowCard 
                    ownerId={anounce.ownerId}
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