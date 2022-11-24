// import Banner1 from '../../../assets/Images/banner-1.png';

import { FcSearch } from 'react-icons/fc';
const BannerSearchComponent = ( ) => {
    return (
        <div className='flex row center w-half my-1 banner-input relative wrap'>
            <h1 className="w-full text-dark-chocolate">Trouver La Bonne Personne <br /> près de chez vous</h1>
            <div className="w-full flex row center">
                <input type='search' name='search' id='search' placeholder='au tours de ... '/>
                <button className='text-primary bg-gold pointer'> <FcSearch/> Rechercher </button>
            </div>
        </div>
    ) ;
}

const Banner = () => {
    return (
        <div className='w-full text-center my-half'>
           {/* <h1 className='py-1'>Find Your Soolmate Roomate </h1> */}
           <div className='banner-container relative flex space-around py-1 wrap ralative'>
                {/* <img src={Banner1} alt='Banner' /> */}
                <BannerSearchComponent/>
           </div>
        </div>
    );
}

export default Banner;