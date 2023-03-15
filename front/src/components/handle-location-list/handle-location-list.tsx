import React, { ChangeEvent, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


import { FaFilter, FaList, FaMapMarkedAlt } from 'react-icons/fa';
import { BiGridAlt } from 'react-icons/bi';

import ColumnCard from '../shared/cards/column-card';
import Modal from '../shared/modals/modals';
import MoreFilterLocation from './More-filter-location';
import { RootState, useAppDispatch } from '../../store/store';
import { Room, RoomsInterface } from '../../_utils/model/rooms-model';
import { useLocation } from 'react-router-dom';
import AnnounceService from '../../services/announce-service';
import { getAnnouncementsBetween } from '../../store/actions/announce-action';

const STEP = 16;
const HandleLocationList = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const [announces, setAnnounces] = useState([] as RoomsInterface[]);
    const [moreFilter, setMoreFilter] = useState(false);
    const [endItem, setEndItem] = useState(STEP);
    const params = new URLSearchParams(location.search);
    const city = params.get('city');
    
    useEffect(() => {
        dispatch(getAnnouncementsBetween(1,endItem));
        AnnounceService.getAnnouncementsBetween(1, endItem)
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
            setAnnounces(rooms.filter(announce => announce.city.toLowerCase().includes((city?city:"").toLowerCase())));
        })
        .catch((err) => {
            console.error(err);
        })
    }, [city, dispatch, endItem])

    const announceLocationList = useSelector((state: RootState) => state.AnnouncementsBetween);
    const {announcement} = announceLocationList;
    
    const closeModal = () => {
        const body = document.querySelector('body');
        if(body) {
            body.classList.remove('active-modal');
        }
        setMoreFilter(false);
    }
    
    const [filters, setfilters] = useState({
        city: city?city:"",
        minRentPerMonth: 100,
        maxRentPerMonth: 10000,
        ageMin: 18,
        ageMax: 90,
        searchtype: '',
        profileState: 'all-profile',
        roomType: '',
        roomfurnishedType:''
    })
    
    const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        setfilters({
            ...filters,
            [e.target.name]: e.target.value
        })
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = e.target.options.selectedIndex;

        setfilters({
            ...filters,
            [e.target.name]: e.target.options[selectedIndex].value
        })
    }

    const ApplyMoreFilter = (allMoreFilters: {
        title: string
        isactive: boolean
        id: string
    }[]) => {
        let ances = announces.filter(announce => (
            (allMoreFilters[0].isactive && announce.genderSearched.join(',').toLowerCase().includes(allMoreFilters[0].title.toLowerCase())) ||
            (allMoreFilters[1].isactive && announce.genderSearched.join(',').toLowerCase().includes(allMoreFilters[1].title.toLowerCase()))
        ));
            setAnnounces(ances);  
            closeModal(); 
    }
    
    const ApplyFilter = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        
        let result: RoomsInterface[] = [];
        // (announcement as Promise<RoomsInterface[]> ).then(res => {
            result = (announcement as RoomsInterface[]).filter(
                room => 
                room.price>=filters.minRentPerMonth && 
                room.price<=filters.maxRentPerMonth &&
                (
                    filters.profileState==='checked'? room.isOwnerCertified===true : 
                    filters.profileState==='no-checked'?room.isOwnerCertified===false: 
                    (room.isOwnerCertified || !room.isOwnerCertified)
                ) &&
                (
                    filters.roomfurnishedType==='furnished'? room.roomfurnishedType===true : 
                    filters.roomfurnishedType==='no-furnished'?room.roomfurnishedType===false: 
                    (room.roomfurnishedType || !room.roomfurnishedType)
                ) &&
                room.roomType.trim().toLowerCase().includes(filters.roomType.toLowerCase().trim()) &&    
                room.city.trim().toLowerCase().includes(filters.city.toLowerCase().trim()) && 
                room.announceType.trim().toLowerCase().includes(filters.searchtype.toLowerCase().trim())
            );
            setAnnounces(result);
        // });
    }
    
    return (
        <>
            <div className='bg-light-blue shadow'>
                <div className='container'>
                    <form className='flex space-around wrap'>
                        <div className='my-1 flex column w-half'>
                            <label htmlFor='city' className='bold pl-1 pointer'>ville</label>
                            <input 
                                type='text' id='city' className='p-half mt-half br-half' value={filters.city} name='city'
                                onChange={(e) =>handleFilterChange(e)}
                            />
                        </div>

                        <div className='my-1 flex column'>
                            <label htmlFor='minRentPerMonth' className='bold pl-1 pointer'>loyer min / mois</label>
                            <input 
                                type='number' id='minRentPerMonth' className='p-half mt-half br-half' value={filters.minRentPerMonth} name='minRentPerMonth'
                                onChange={(e) =>handleFilterChange(e)}
                            />
                        </div>

                        <div className='my-1 flex column'>
                            <label htmlFor='maxRentPerMonth' className='bold pl-1 pointer'>loyer max / mois</label>
                            <input 
                                type='number' id='maxRentPerMonth' className='p-half mt-half br-half' value={filters.maxRentPerMonth} name='maxRentPerMonth'
                                onChange={(e) =>handleFilterChange(e)}
                            />
                        </div>

                        <div className='my-1 flex column'>
                            <label htmlFor='searchtype' className='bold pl-1 pointer'>je cherche un coloc</label>
                            <select name='searchtype' id='searchtype' className='p-half mt-half br-half pointer' onChange={(e) => handleSelectChange(e)}>
                                <option value=''>tout type</option>
                                <option value='HAVEROOM'>ayant une location</option>
                                <option value='needRoom'>qui cherche une location</option>
                            </select>
                        </div>

                        <div className='my-1 flex column'>
                            <label htmlFor='recherche' className='bold text-center'>ok</label>
                            <button className='p-half br-half pointer mt-half bg-light-gold bold' id='recherche' onClick={(e)=>ApplyFilter(e)}> 
                                Appliquer
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className='container my-1'>
                <h3 className='text-center'>Nous vous avons trouvé '{announces.length}' Potentiels Colocs {filters.city!==""? <>à {filters.city}</>:null}</h3>
                <p className='text-center'>Vous pouvez utiliser les filtres pour trouver votre Coloc Soulmate :) </p>

                <div className='flex space-between my-2 wrap shadow-top px-1'>

                    <div className='my-half flex space-around'>

                        <div>
                            <p>Type de logement</p>
                            <div className='flex'>
                                <select className='p-half mt-half br-half pointer' id='roomType' name='roomType' onChange={e => handleSelectChange(e)}>
                                    <option value=''>Tout</option>
                                    <option value='APPARTEMENT'>APPARTEMENT</option>
                                    <option value='maison'>Maison</option>
                                    <option value='studio'>Studio</option>
                                </select>
                            </div>
                        </div>

                        <div className='pl-1'>
                            <p>Amenagement</p>
                            <div className='flex'>
                                <select className='p-half mt-half br-half pointer' id='roomfurnishedType' name='roomfurnishedType' onChange={e => handleSelectChange(e)}>
                                    <option value=''>Tout</option>
                                    <option value='furnished'>Meublé</option>
                                    <option value='no-furnished'>Non Meublé</option>
                                </select>
                            </div>
                        </div>

                        
                    </div>

                    

                    <div className='my-half'>
                        <p>plus de filtres</p>

                        <small className='flex space-around wrap'>
                            <select className='p-half mt-half br-half pointer' id='type' name='profileState' onChange={e => handleSelectChange(e)}>
                                    <option value='checked'>profils vérifiés</option>
                                    <option value='no-checked'>Non vérifiés</option>
                                    <option value='all-profile'>tout afficher</option>
                            </select>

                            <div className='pl-half'>
                                <div className='flex'>
                                    <div className='p-half mt-half flex center br-half border-1 text-center pointer' id='type' onClick={()=>setMoreFilter(!moreFilter)}>
                                        <FaFilter
                                            color='blue'
                                        />
                                        <p className='px-half'>plus</p>
                                    </div>
                                </div>
                            </div>

                            <div className='pl-half'>
                                <div className='flex'>
                                    <div className='p-half mt-half flex center br-half border-1 text-center pointer' id='type'>
                                        <FaMapMarkedAlt
                                            color='green'
                                        />
                                        <p className='px-half'>carte</p>
                                    </div>
                                </div>
                            </div>

                            <div className='pl-half'>
                                <div className='flex'>
                                    <div className='p-half mt-half flex center br-half border-1 text-center pointer' id='type'>
                                        <FaList
                                            color='brown'
                                            fontSize={18}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='pl-half'>
                                <div className='flex'>
                                    <div className='p-half mt-half flex center br-half border-1 text-center pointer' id='type'>
                                        <BiGridAlt
                                            color='#042054'
                                            fontSize={18}
                                        />
                                    </div>
                                </div>
                            </div>
                        </small>
                        <div className='my-1 flex column'>
                            <button className='p-half br-half pointer mt-half bg-light-gold bold' id='recherche' onClick={(e)=>ApplyFilter(e)}> 
                                Appliquer
                            </button>
                        </div>
                    </div>

                </div>

                <div className='my-1 flex wrap md-center'>
                    {
                        announces.map((announce)=>{
                            return(
                                <ColumnCard key={announce.id} cardValues={announce} announceId={announce.id}/>
                            )
                        })
                    }
                </div>

                {
                    announces.length >= endItem &&
                    <div className="my-1 p-halh text-center p-1 bg-light-gold text-xl bold pointer" onClick={(e)=>setEndItem(endItem+STEP)}>
                        voir plus !
                    </div>
                }

            </div>
            {
                moreFilter && <Modal closeModal={closeModal}> 
                    <MoreFilterLocation handleFilterChange={handleFilterChange} filters={filters} closeModal={closeModal} ApplyMoreFilter={ApplyMoreFilter}/>
                </Modal>
            }
        </>
    );
}

export default HandleLocationList;