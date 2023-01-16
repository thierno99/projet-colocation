import React, { ChangeEvent, useState } from 'react';

import ColumnCard from '../shared/cards/column-card';
import { ROOMS } from '../../_utils/mocks/rooms-mock';
import { getMockUser } from '../../services/user.service';
import Modal from '../shared/modals/modals';
import MoreFilterLocation from './More-filter-location';
import FilterTop from './filter-top';
import FilterMore from './filter-more';


const HandleLocationList = () => {

    const [moreFilter, setMoreFilter] = useState(false);
    const [announces, setAnnounces] = useState(ROOMS);

    const closeModal = () => {
        const body = document.querySelector('body');
        if(body) {
            body.classList.remove('active-modal');
        }
        setMoreFilter(false);
    }
    
    const [filters, setfilters] = useState({
        city: '',
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
        //FIXME manage gender filter 
        // let ances = announces.filter(announce => (
        //     (allMoreFilters[0].isactive && announce.genderSearched.toLowerCase().includes(allMoreFilters[0].title.toLowerCase())) ||
        //     (allMoreFilters[1].isactive && announce.genderSearched.toLowerCase().includes(allMoreFilters[1].title.toLowerCase()))
        // ));
        // if(allMoreFilters[0].isactive || allMoreFilters[0].isactive){
        //     setAnnounces(ances);        
        // }
    }
    
    const ApplyFilter = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        const ances = ROOMS.filter(
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
        setAnnounces(ances);
    }

    
    return (
        <>
            <FilterTop 
                filters={filters} 
                handleFilterChange={handleFilterChange} 
                handleSelectChange={handleSelectChange} 
                ApplyFilter={ApplyFilter}
            />
            
            <div className='container my-1'>
                <h3 className='text-center'>Nous vous avons trouvé '600' Potentiels Colocs à Bordeaux</h3>
                <p className='text-center'>Vous pouvez utiliser les filtres pour trouver votre Coloc Soulmate :) </p>

                <FilterMore handleSelectChange={handleSelectChange} setMoreFilter={setMoreFilter} moreFilter={!moreFilter}/>
                <div className='my-1 flex wrap md-center'>
                    {
                        announces.map((announce)=>{
                            return(
                                <ColumnCard key={announce.id} cardValues={announce} user={getMockUser(announce.ownerId)}/>
                            )
                        })
                    }
                </div>
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