import React, { FC } from 'react';
import { BiGridAlt } from 'react-icons/bi';
import { FaFilter, FaList, FaMapMarkedAlt } from 'react-icons/fa';

interface FilterProps {
    handleSelectChange:  (e: React.ChangeEvent<HTMLSelectElement>) => void;
    setMoreFilter:  (value: React.SetStateAction<boolean>) => void;
    moreFilter: boolean;
}

const FilterMore:FC<FilterProps> = (props) => {
    const { moreFilter, handleSelectChange, setMoreFilter } = props;

    return (
        <div className='flex space-between my-2 wrap shadow-top px-1'>

            <div className='my-half flex space-around'>

                <div>
                    <p>Type de logement</p>
                    <div className='flex'>
                        <select className='p-half mt-half br-half pointer' id='roomType' name='roomType' onChange={e => handleSelectChange(e)}>
                            <option value=''>Tout</option>
                            <option value='appartement'>Appartement</option>
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
                            <div className='p-half mt-half flex center br-half border-1 text-center pointer' id='type' onClick={()=>setMoreFilter(moreFilter)}>
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
            </div>
        </div>

    );
}

export default FilterMore;