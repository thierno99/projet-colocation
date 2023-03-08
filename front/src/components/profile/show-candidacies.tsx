import React, { FC, useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { FcAcceptDatabase } from 'react-icons/fc';
import CandidacyService from '../../services/candidacy.service';
import { useAppDispatch } from '../../store/store';
import { CandidacyResponseDto } from '../../_utils/model/dto/candacyResDto';
import { RoomsInterface } from '../../_utils/model/rooms-model';
import { UserInterface } from '../../_utils/model/user-model';
interface ShowCandidaciesProps {
    userInfo: UserInterface
};

const ShowCandidacies:FC<ShowCandidaciesProps> = (props) => {
    const dispatch = useAppDispatch();
    const [candidacies, setCandidacies] = useState([] as CandidacyResponseDto[])
    const { userInfo } = props;

    useEffect(() => {
        CandidacyService.getCandidacyByOwnerId(userInfo?.id)
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

    const acceptCandidacy = (candidacy: CandidacyResponseDto) => {
        const confirm = window.confirm(`êtes vous sur de vouloir ACCEPTER la démande de ${candidacy.user.firstname} ?`);
        if(confirm) {
            CandidacyService.updateCandidacyStatus(candidacy.id, "ACCEPTED")
            .then((res) => {
                console.log(res);
            })
            .catch((err) => { console.log(err); });
        }
    }

    const refuseCandidacy = (candidacy: CandidacyResponseDto) => {
        const confirm = window.confirm(`êtes vous sur de vouloir REFUSER la démande de ${candidacy.user.firstname} ?`);
        if(confirm) {
            CandidacyService.updateCandidacyStatus(candidacy.id, "REFUSED")
            .then((res) => {
                console.log(res);
            })
            .catch((err) => { console.log(err); });
        }
    }
    return (
        <div className={"mx-auto  relative border-1 br-1 w-full flex column mt-half p-1  overflow-scroll bg-light-blue"+(userInfo?.roles.map(a => a.name).indexOf("MANAGER")!==-1?" w-half": " w-100")}>
            <h4 className='text-center py-1'>Candidatures</h4>

            <div className="flex column center w-100 relative">
                {
                    candidacies.length <= 0 ?
                        <div className='w-full my-1'>
                            <h5 className='text-center text-gray'>Aucune Candidature Pour le moment</h5>
                        </div>
                    :
                    
                    <div className="flex space-between w-100 small-font">
                        <table className='table w-100'>
                            <thead>
                                <tr>
                                    <th className='relative'></th>
                                    
                                    <th>nom d'usage</th>

                                    <th>email</th>

                                    <th>accepter</th>
                                    
                                    <th>Refuser</th>
                                </tr>

                            </thead>
                            <tbody className=''>
                                {
                                    candidacies.map((c) => {
                                        return (
                                            <tr>
                                                <td>
                                                    <img src={`data:image/png;base64,${c.user.profileImg}`} alt="" className='w-30 rounded-full overflow-hidden mini-img'/>
                                                </td>
                                                <td>{c.user.firstname+" "+c.user.lastname}</td>
                                                <td>
                                                    <p className='px-1 w-full p-half'> {c.user.email} </p>
                                                </td>

                                                <td>
                                                    <button className={'px-1 w-full border-1 p-half' + (c.status.toLowerCase()==="accepted"?" desabled": " success btn") } onClick={()=>acceptCandidacy(c)}><FcAcceptDatabase fontSize={20} color={"#ccc"}/></button>
                                                </td>

                                                <td>
                                                    <button className={'px-1 border-1 w-full p-half'+ (c.status.toLowerCase()==="accepted"?" desabled": " danger btn") } onClick={()=>refuseCandidacy(c)}><AiFillDelete/></button>
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

export default ShowCandidacies;