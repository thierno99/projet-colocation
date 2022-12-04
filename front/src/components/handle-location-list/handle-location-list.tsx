import React, { ChangeEvent } from 'react';
import { FaFilter, FaList, FaMapMarkedAlt } from 'react-icons/fa';
import { BiGridAlt } from 'react-icons/bi';
import ColumnCard from '../shared/cards/column-card';

const SearchComponent = () => {
    const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {

    }
    return (
        
        <div className='bg-light-blue shadow'>
            <div className='container'>
                <form className='flex space-around wrap'>
                    <div className='my-1 flex column w-half'>
                        <label htmlFor='city' className='bold pl-1'>ville</label>
                        <input 
                            type='text' id='city' className='p-half mt-half br-half' value={'Bordeaux'} name='city'
                            onChange={(e) =>handleCityChange(e)}
                        />
                    </div>

                    <div className='my-1 flex column'>
                        <label htmlFor='minRentPerMonth' className='bold pl-1'>loyer min / mois</label>
                        <input 
                            type='number' id='minRentPerMonth' className='p-half mt-half br-half' value={600} name='minRentPerMonth'
                            onChange={(e) =>handleCityChange(e)}
                        />
                    </div>

                    <div className='my-1 flex column'>
                        <label htmlFor='maxRentPerMonth' className='bold pl-1'>loyer max / mois</label>
                        <input 
                            type='number' id='maxRentPerMonth' className='p-half mt-half br-half' value={1000} name='maxRentPerMonth'
                            onChange={(e) =>handleCityChange(e)}
                        />
                    </div>

                    <div className='my-1 flex column'>
                        <label htmlFor='searchtype' className='bold pl-1'>je cherche un coloc</label>
                        <select name="searchtype" id="searchtype" className='p-half mt-half br-half'>
                            <option value="tous">tout type</option>
                            <option value="haveRoom">ayant une location</option>
                            <option value="needRoom">qui cherche une location</option>
                        </select>
                    </div>

                    <div className='my-1 flex column'>
                        <label htmlFor="recherche" className='bold'>recherche</label>
                        <button className='p-half br-half pointer mt-half bg-primary text-light bold' id='recherche'> 
                            recherche
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const HandleLocationList = () => {
    return (
        <>
            <SearchComponent/>
            <div className="container my-1">
                <h3 className="text-center">Nous vous avons trouvé "600" Potentiels Colocs à Bordeaux</h3>
                <p className='text-center'>Vous pouvez utiliser les filtres pour trouver votre Coloc Soulmate :) </p>

                <div className="flex space-between my-2 wrap shadow-top px-1">

                    <div className='my-half flex space-around'>

                        <div>
                            <p>Type de logement</p>
                            <div className="flex">
                                <select className='p-half mt-half br-half' id='type' onChange={e => {
                                    console.log(e.target.value);
                                }}>
                                    <option value=''>Appartement</option>
                                    <option value='Adereço'>Maison</option>
                                    <option value='Não'>Studio</option>
                                </select>
                            </div>
                        </div>

                        <div className='pl-1'>
                            <p>Amenagement</p>
                            <div className="flex">
                                <select className='p-half mt-half br-half' id='type' onChange={e => {
                                    console.log(e.target.value);
                                }}>
                                    <option value=''>Meublé</option>
                                    <option value='Adereço'>Non Meublé</option>
                                </select>
                            </div>
                        </div>

                        
                    </div>

                    

                    <div className='my-half'>
                        <p>plus de filtres</p>

                        <small className="flex space-around wrap">
                            <select className='p-half mt-half br-half' id='type' onChange={e => {
                                console.log(e.target.value);
                            }}>
                                    <option value='checked'>profils vérifiés</option>
                                    <option value='no-checked'>Non vérifiés</option>
                                    <option value='all-profile'>tout afficher</option>
                            </select>

                            <div className='pl-half'>
                                <div className="flex">
                                    <div className='p-half mt-half flex center br-half border-1 text-center' id='type'>
                                        <FaFilter
                                            color='blue'
                                        />
                                        <p className='px-half'>plus</p>
                                    </div>
                                </div>
                            </div>

                            <div className='pl-half'>
                                <div className="flex">
                                    <div className='p-half mt-half flex center br-half border-1 text-center' id='type'>
                                        <FaMapMarkedAlt
                                            color='green'
                                        />
                                        <p className='px-half'>carte</p>
                                    </div>
                                </div>
                            </div>

                            <div className='pl-half'>
                                <div className="flex">
                                    <div className='p-half mt-half flex center br-half border-1 text-center' id='type'>
                                        <FaList
                                            color='brown'
                                            fontSize={18}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='pl-half'>
                                <div className="flex">
                                    <div className='p-half mt-half flex center br-half border-1 text-center' id='type'>
                                        <BiGridAlt
                                            color='#042054'
                                            fontSize={18}
                                        />
                                    </div>
                                </div>
                            </div>
                        </small>
                    </div>
                </div>

                <div className="my-1 flex wrap space-between sm-center">
                    {
                        [1,2,3,4,5,6,2,34,56,4,5].map((announce,i)=>{
                            return(
                                <ColumnCard key={i}/>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default HandleLocationList;