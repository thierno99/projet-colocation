import React, { ChangeEvent, FC } from 'react';
export interface IFilters {
    city: string;
    minRentPerMonth: number;
    maxRentPerMonth: number;
    ageMin: number;
    ageMax: number;
    searchtype: string;
    profileState: string;
    roomType: string;
    roomfurnishedType: string;
}

interface FilterTopProps {
    filters: IFilters;
    handleFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSelectChange:  (e: React.ChangeEvent<HTMLSelectElement>) => void;
    ApplyFilter: (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}

const FilterTop: FC<FilterTopProps> = (props) => {
    const { filters, handleFilterChange, handleSelectChange, ApplyFilter } = props;
    return(
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
                            <option value='haveRoom'>ayant une location</option>
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
    );
}

export default FilterTop;