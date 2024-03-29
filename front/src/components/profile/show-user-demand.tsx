import React, { FC, useEffect, useState } from 'react';
import { AiFillDelete, AiOutlineCheck, AiOutlineClose, AiOutlineReload } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { ABORTED, ACCEPTED, REFRESH, REFUSED } from '../../constants/constants';
import AccountServices from '../../services/account.service';
import CandidacyService from '../../services/candidacy.service';
import RoomateService from '../../services/roomate.service';
import UserServices from '../../services/user.service';
import { useAppDispatch } from '../../store/store';
import { Candidacy } from '../../_utils/model/candidacy-model';
import { CandidacyResponseDto } from '../../_utils/model/dto/candacyResDto';
import { RoomsInterface } from '../../_utils/model/rooms-model';
import { User, UserInterface } from '../../_utils/model/user-model';
interface ShowUserDmdProps {
    // userInfo: UserInterface
};

const ShowUserDmd:FC<ShowUserDmdProps> = (props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [candidacies, setCandidacies] = useState([] as CandidacyResponseDto[])
    const [userInfo, setUerInfo] = useState(null as unknown as User);
    const userId = (localStorage.getItem('userId') as string);
    console.log(userId);

    const [responseMsg, setResponseMsg] = useState(
        {
            message: "",
            style: "",
            type: ""
        }
    );

    useEffect(() => {

        UserServices.getUserById(userId).then((user) => {
            let usr = new User(
                user.lastname,
                user.firstname,
                user.sexe,
                user.dateOfBirth,
                user.phoneNumber,
                user.email,
                user.password,
                user.isEmailVerified,
                user.iscertified,
                user.profileImg,
                user.autorizeHaldleTel,
                user.autorizeHaldleEmail,
                user.roles
            );
            usr.id = userId;
            setUerInfo(usr);
        }).catch(error => {
            if(error.code === "ERR_NETWORK") {
                AccountServices.logout();
            }
        })

        if(userInfo?.id && userInfo?.id !== "null") {
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
                    AccountServices.logout();
                }
            })

        }

    }, [dispatch, userId, userInfo?.id]);

    const delCandidacy = (candidacy: CandidacyResponseDto) => {
        if(candidacy.status===REFUSED) {
            CandidacyService.removeCandidacy(candidacy.id)
            .then(()=> {
                setResponseMsg({
                    message: "Suppression effectuée avec succès actualiser pour la mise à jour",
                    style: "success",
                    type: REFRESH
                });
            })
            .catch((err) => { 
                setResponseMsg({
                    message: "un problème est survenue veillez reessayer plus tard",
                    style: "danger",
                    type: 'quit'
                });
             });

             return;
        }
        const confirm = window.confirm(`êtes vous sur de vouloir Annuler votre candidature pour ce logement?`);
        if(confirm) {
            const c = new Candidacy(
                candidacy.id,
                candidacy.announce.id,
                candidacy.announce.ownerId,
                candidacy.user.id,
                ABORTED
            )
            CandidacyService.updateCandidacyStatus(c)
            .then((res) => {
                setResponseMsg({
                    message: "succès ! votre demande a été annuler nous enverons une notification à l'annonceur merci de votre confiance",
                    style: "success",
                    type: REFRESH
                });
            })
            .catch((err) => { 
                setResponseMsg({
                    message: "un problème est survenue veillez reessayer plus tard",
                    style: "danger",
                    type: 'quit'
                });
             });
        }
    }

    const acceptProposition = (candidacy: CandidacyResponseDto) => {
        if(window.confirm("Are you sure you want to accept")) {
            const formdata: FormData = new FormData();
            formdata.append("managerId", candidacy.announce.ownerId);
            formdata.append("userId", candidacy.user.id);
            formdata.append("announceId", candidacy.announce.id);

            RoomateService.saveRoomate(formdata)
            .then((res) => {
                CandidacyService.removeCandidacy(candidacy.id).then(()=> {
                    setResponseMsg({
                        message: "Demande validé, le manager prendra contact avec vous très prochainement",
                        style: "success",
                        type: REFRESH
                    });
                })
            })
            .catch((err) => {
                setResponseMsg({
                    message: "un problème est survenue veillez reessayer plus tard",
                    style: "danger",
                    type: 'quit'
                });
            });
        }
    }
    return (
        <div className={"my-2 mx-auto  relative border-1 br-1 w-full flex column mt-half p-1 overflow-scroll mh-80"}>
            <h4 className='text-center py-1'>Mes Demandes</h4>

            {
                responseMsg.message!=="" &&
                <div className={`text-center ${responseMsg.style} w-100 p-1 flex space-around`}>
                    {responseMsg.message}
                    <button className='bg-none border-1 flex flex-end'
                        onClick={()=> responseMsg.type === 'refresh'? window.location.reload(): setResponseMsg({...responseMsg, message:"", type:""})}
                    >
                        {
                            responseMsg.type===REFRESH ?
                            <>
                                <h4>
                                    rafraichir
                                </h4>
                                <AiOutlineReload fontSize={30}/>
                            </>
                            :
                            <AiOutlineClose fontSize={30}/>
                        }
                    </button>
                </div>
            }

            <div className="flex column center w-100 relative">
                {
                    candidacies.length <= 0 ?
                        <div className='w-full my-1'>
                            <h5 className='text-center text-gray'>Vous n'avez aucune démande</h5>
                            <div className="flex w-100 center">

                                <button className="mr-half w-half btn bg-light-pink w-full py-half px-1 my-1" onClick={() => navigate('/app/rooms')}>
                                    Trouver 
                                </button>
                            </div>
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
                                        if(c.status !==ABORTED)
                                            return (
                                                
                                                <tr key={c.id}>
                                                    <td>{i+1}</td>
                                                    <td>{c.announce.title}</td>
                                                    <td>
                                                        <p className='px-1 w-full p-half text-danger'>
                                                            {
                                                                c.status === ACCEPTED ?
                                                                (
                                                                    <div className="flex space-between">
                                                                        <AiOutlineCheck color='green' fontSize={18} className="pointer hover-shadow" onClick={()=>acceptProposition(c)}/>
                                                                        <AiOutlineClose color='red' fontSize={18} className="pointer hover-shadow" onClick={()=>delCandidacy(c)}/>
                                                                    </div>
                                                                ):
                                                                (
                                                                    c.status
                                                                )
                                                            }
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <button className='px-1 danger border-1 w-full p-half btn' onClick={()=>delCandidacy(c)}><AiFillDelete/></button>
                                                    </td>
                                                </tr>

                                            )
                                        return null;
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