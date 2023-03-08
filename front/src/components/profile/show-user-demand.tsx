import React, { FC, useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import CandidacyService from '../../services/candidacy.service';
import { useAppDispatch } from '../../store/store';
import { CandidacyResponseDto } from '../../_utils/model/dto/candacyResDto';
import { RoomsInterface } from '../../_utils/model/rooms-model';
import { UserInterface } from '../../_utils/model/user-model';
interface ShowUserDmdProps {
    userInfo: UserInterface
};

const ShowUserDmd:FC<ShowUserDmdProps> = (props) => {
    const dispatch = useAppDispatch();
    const [candidacies, setCandidacies] = useState([] as CandidacyResponseDto[])
    const { userInfo } = props;

    useEffect(() => {
        CandidacyService.getCandidacyByUserId(userInfo?.id)
        .then((res) => { 
            let candidacies: CandidacyResponseDto[] = []; 
            console.info(res);
            res.forEach((candidate: { id: string; announce: RoomsInterface; user: UserInterface; status: string; }) => {
                candidacies.push(new CandidacyResponseDto(candidate.id, candidate.announce, candidate.user, candidate.status))
            });

            setCandidacies(candidacies);
        })
        .catch(error => {
            if(error.code === "ERR_NETWORK") {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
            }
        })
    }, [dispatch, userInfo?.id]);

    const delCandidacy = (candidacy: CandidacyResponseDto) => {
        const confirm = window.confirm(`êtes vous sur de vouloir Annuler votre candidature pour ce logement?`);
        if(confirm) {
            CandidacyService.updateCandidacyStatus(candidacy.id, "ABORTED")
            .then((res) => {
                console.log(res);
            })
            .catch((err) => { console.log(err); });
        }
    }
    return (
        <div className={"mx-auto  relative border-1 br-1 w-full flex column mt-half p-1 overflow-scroll max-h-400"+(userInfo?.roles.map(a => a.name).indexOf("MANAGER")!==-1?" w-half": " w-100")}>
            <h4 className='text-center py-1'>Mes Demandes</h4>

            <div className="flex column center w-100 relative">
                {
                    candidacies.length <= 0 ?
                        <div className='w-full my-1'>
                            <h5 className='text-center text-gray'>Vous n'avez aucune démande</h5>
                        </div>
                    :
                    
                    <div className="flex space-between w-100 small-font">
                        <table className='table w-100'>
                        <thead>
                            <tr>
                                <th className='relative'>N°</th>
                                
                                <th>nom</th>

                                <th>etat</th>
                                
                                <th>del</th>
                            </tr>

                        </thead>
                            <tbody className=''>
                                {
                                    candidacies.map((c,i) => {
                                        return (
                                            <tr>
                                                <td>{i+1}</td>
                                                <td>{c.announce.title}</td>
                                                <td>
                                                    <p className='px-1 w-full p-half text-danger'>{c.status}</p>
                                                </td>
                                                <td>
                                                    <button className='px-1 danger border-1 w-full p-half btn' onClick={()=>delCandidacy(c)}><AiFillDelete/></button>
                                                </td>
                                            </tr>

                                        )
                                    })
                                }
                
                            </tbody>
                        </table>
                    </div>
                }
                
            </div>
        </div>
    );
}

export default ShowUserDmd;