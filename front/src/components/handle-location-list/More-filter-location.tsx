import { ChangeEvent, FC, useState } from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import { CiCircleRemove } from 'react-icons/ci';

interface MoreFilterProps {
    handleFilterChange: (e: ChangeEvent<HTMLInputElement>) => void
    filters: any;
    closeModal:  () => void;
    ApplyMoreFilter: (allMoreFilters: {
        title: string;
        isactive: boolean;
        id: string;
    }[]) => void
}

const MoreFilterLocation: FC<MoreFilterProps> = (props) => {
    const {handleFilterChange, filters, closeModal, ApplyMoreFilter } = props;
    const [ApplyChange, setApplyChange] = useState(true);
    const [selectFilterAge, setSelectFilterAge] = useState({
        agemin: false, agemax: false
    });

    const [allMoreFiltersTxt, setAllMoreFiltersTxt] = useState(
        [
            {title: 'Homme', isactive: false, id: 'onlyman'},
            {title: 'Femme', isactive: false, id: 'onlywoman'},
        ]
    );

    const apply = () => {
        // closeModal();
        ApplyMoreFilter(allMoreFiltersTxt);
    }


    const [allMoreFiltersLabeled, setAllMoreFiltersLabeled] = useState(
        [
            {title: 'age min', isactive: false, id: 'ageMin'},
            {title: 'age max', isactive: false, id: 'ageMax'},
        ]
    );
    
    const HandleMoreFilterChangeTxt = (id: number) => {
        const tmp = allMoreFiltersTxt;
        tmp[id].isactive = !allMoreFiltersTxt[id].isactive;
        console.log(tmp);
        setAllMoreFiltersTxt(tmp);
        setApplyChange(!ApplyChange);
    }
    
    const HandleMoreFilterLabeled = (id: number) => {
        const tmp = allMoreFiltersLabeled;
        tmp[id].isactive = !allMoreFiltersLabeled[id].isactive;
        console.log(tmp);
        setAllMoreFiltersLabeled(tmp);
        if(id === 0) {
            setSelectFilterAge({...selectFilterAge, agemin: !selectFilterAge.agemin});
        }else if(id === 1) {
            setSelectFilterAge({...selectFilterAge, agemax: !selectFilterAge.agemax});
        }
        // setApplyChange(!ApplyChange);
    }
    return (
        <div>
            <>
                <h4 className='p-half'>filtre actives: </h4>
                <hr />
                <div className='flex wrap p-1 items-center'>
                    {
                        allMoreFiltersTxt.map((filter,i) => {
                            if(filter.isactive){
                                return(
                                    <div className='mx-half p-half br-half border-1 pointer relative'  key={i}>
                                        <div className="absolute top-0 right-0 b-1" style={{padding: '2px'}}>
                                            <CiCircleRemove fontSize={18} className='erease-icone'
                                                onClick={(e)=>HandleMoreFilterChangeTxt(i)}
                                            />
                                        </div>
                                        <p className='my-half'>
                                            {filter.title}
                                        </p>
                                    </div>
                                );
                            }
                            return null;
                        }
                        )
                    }
                    {
                        allMoreFiltersLabeled.map((filter,i) => {
                            if(filter.isactive){
                                return(
                                    <div className='mx-half flex column relative' key={i}>
                                        <label htmlFor={filter.id} className='bold pl-1 pointer'>{filter.title}</label>
                                        
                                        <input 
                                            type='number' id={filter.id} className='p-half mt-half br-half' value= { filters[filter.id]} name={filter.id}
                                            onChange={(e) =>handleFilterChange(e)}
                                        />
                                        <div className="absolute top-0 right-0 b-1" style={{padding: '2px'}}>
                                            <CiCircleRemove fontSize={18} className='erease-icone'
                                                onClick={()=>HandleMoreFilterLabeled(i)}
                                            />
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        }
                        )
                    }
                </div>
            </>

            <>
                <h4 className='p-half'>selectionner plus de filtres: </h4>
                <hr />
                <div className='flex wrap p-1 items-center'>
                    {
                        allMoreFiltersTxt.map((filter,i) => {
                            if(!filter.isactive){
                                return(
                                    <div className='mx-half p-half br-half border-1 pointer'  key={i} onClick={()=>HandleMoreFilterChangeTxt(i)}>
                                        {filter.title}
                                    </div>
                                );
                            }
                            return null;
                        }
                        )
                    }
                    {
                        allMoreFiltersLabeled.map((filter,i) => {
                            if(!filter.isactive){
                                return(
                                    <div className='mx-half flex column relative' key={i}>
                                        <label htmlFor={filter.id} className='bold pl-1 pointer'>{filter.title}</label>
                                        <input 
                                            type='number' id={filter.id} className='p-half mt-half br-half' value={filters[filter.id]} name={filter.id}
                                            onChange={(e) =>handleFilterChange(e)}
                                        />
                                        <div className="absolute top-0 right-0 b-1" style={{padding: '2px'}}>
                                            <BsCheckCircle fontSize={18} className='success-icone'
                                                onClick={()=>HandleMoreFilterLabeled(i)}
                                            />
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        }
                        )
                    }
                </div>
                <button className='absolute right-0 p-half m-1 bg-light-gold br-half bottom-0 pointer' onClick={apply}>
                    Appliquer les filtres
                </button>
            </>
        </div>
    );
}

export default MoreFilterLocation;