import React from 'react';
import Banner1 from '../../../assets/Images/banner-1.png';

import { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
const BannerSearchComponent = ( ) => {

    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const gotoRooms = () => {
        navigate('/app/rooms?city='+searchValue);
    }
    
    return (
        <div className='flex row center w-half my-1 banner-input relative wrap'>
            <h1 className="w-full text-dark-chocolate">Trouver La Bonne Personne <br /> près de chez vous</h1>
            <div className="w-full flex row center">
                <input type='search' name='search' id='search' placeholder='au tours de ... 'value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>
                <button className='text-primary bg-gold pointer' onClick={()=>gotoRooms()}> <FcSearch/> Rechercher </button>
            </div>
        </div>
    ) ;
}

const Banner = () => {
    return (
        <div className='w-100 text-center my-half shadow'>
           {/* <h1 className='py-1'>Find Your Soolmate Roomate </h1> */}
           <div className='banner-container relative flex space-around py-1 wrap ralative'>
                <img src={Banner1} alt='Banner' />
                <BannerSearchComponent/>
           </div>
        </div>
    );
}

export default Banner;