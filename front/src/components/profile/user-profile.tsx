import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import { BiEdit } from 'react-icons/bi';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { IoMdAddCircleOutline, IoMdNotificationsOutline } from 'react-icons/io';
import { AiOutlineClose, AiOutlineSave, AiOutlineCheck, AiOutlineReload } from 'react-icons/ai';
import { GrTask } from 'react-icons/gr';
import { GiOpenPalm, GiShakingHands } from 'react-icons/gi';


import UserServices from '../../services/user.service';
import { UserInfoAction } from '../../store/actions/user-action';
import { useAppDispatch } from '../../store/store';
import { User, UserInterface } from '../../_utils/model/user-model';
import { EMAIL_REG, FR_PHONE_NUMBER_FORMAT_REG } from '../../constants/regex';
import { UserDto } from '../../_utils/model/dto/userDto';
import ShowAnnounces from './show-announces';
import { FaUsers } from 'react-icons/fa';
import AccountServices from '../../services/account.service';
import { useNavigate } from 'react-router-dom';

interface InputImgFileProp {
    clickLoadImgFile: () => void,
    handleImageFileChange: (e: ChangeEvent<HTMLInputElement>) => void,
    user: UserInterface
}

const InputImgFile:FC<InputImgFileProp> = (props) => {
    const {user,clickLoadImgFile, handleImageFileChange} = props;
    console.log(user);
    return (
        <div className='flex center rounded-full profile-img pointer hover-success m-half' onClick={() => clickLoadImgFile()}>
            <MdAddPhotoAlternate fontSize={30} className={"upload" + (!user?.profileImg?"":' hide') }/>
            <input 
                type="file" 
                name="principalImg" 
                id={"input-mg"} 
                accept="image/*" hidden={true}
                onChange={(e)=>handleImageFileChange(e)}
            />            
            <img 
                src={
                    (user?.profileImg && user?.profileImg.type !=="image/png")?`data:image/png;base64,${user?.profileImg}`:(user?.profileImg?URL.createObjectURL(user?.profileImg):"#")
                } 
                alt="" className={`w-full br-1 images-dest`+ (user?.profileImg?"":' hide')}
            />
        </div>
    );
}

const UserProfile:FC<any> = (props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userId = (localStorage.getItem('userId') as string);
    const [userInfo, setUerInfo] = useState(null as unknown as User);
    const [isEditModeActive, setIsEditModeActive] = useState(false);
    const [isProfileChanged, setIsProfileChanged] = useState(false);
    const [validatebtnColor, setValidatebtnColor] = useState("green");

    const [responseMsg, setResponseMsg] = useState(
        {
            message: "",
            style: "",
            type: ""
        }
    );


    const [userInformations, setUserInformations] = useState(
        {
            firstname: userInfo?.firstname,
            lastname: userInfo?.lastname,
            email: userInfo?.email,
            adress: "5 rue tyri, 64560, pau",
            phoneNumber: userInfo?.phoneNumber
        }
    );

    useEffect(() => {
        
        dispatch(UserInfoAction(userId));
        UserServices.getUserById(userId).then((user) => {
            let userInfo = new User(
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
            userInfo.id = userId;
            setUerInfo(userInfo);
            setUserInformations(
                {
                    firstname: userInfo?.firstname,
                    lastname: userInfo?.lastname,
                    email: userInfo?.email,
                    adress: "5 rue tyri, 64560, pau" ,
                    phoneNumber: userInfo?.phoneNumber
                }
            )
        }).catch(error => {
            if(error.code === "ERR_NETWORK") {
                AccountServices.logout();
            }
        })
    }, [userId, dispatch]);

    const clickLoadImgFile = () => {
        const inputFilebtn = document.getElementById('input-mg');
        if(inputFilebtn) {
            inputFilebtn.click();
        }
    }

    const saveProfile = () => {
        console.log("profile updating ................");

            
        const formdata: FormData = new FormData();

        const user = new UserDto(
            userInfo.id,
            userInfo.lastname,
            userInfo.firstname,
            userInfo.sexe,
            userInfo.dateOfBirth,
            userInfo.phoneNumber,
            userInfo.email,
            userInfo.password,
            userInfo.isEmailVerified,
            userInfo.iscertified,
            userInfo.autorizeHaldleTel,
            userInfo.autorizeHaldleEmail,
            userInfo.roles
        );

        console.info(userInfo);
        formdata.append("user", JSON.stringify(user));
        formdata.append("profile", userInfo.profileImg);

        

        UserServices.saveUserProfile(formdata).then((res)=>{
            console.log(res);
            setResponseMsg({
                message: "profile modifier avec succès",
                style: "success",
                type: "quit"
            });
        }).catch((err)=>{
            setResponseMsg({
                message: "echeck de modification",
                style: "danger",
                type: "refresh"
            });
        });

        setIsProfileChanged(false);


    }


    const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        const imagesDestination = document.querySelectorAll('.images-dest');
        const upload = document.querySelector('.upload');
        if(imagesDestination) {
            if(files){
                const url = URL.createObjectURL(files[0]);
                (imagesDestination[0] as HTMLImageElement).src = url;
                if(imagesDestination[0].classList.contains('hide')) {
                    imagesDestination[0].classList.remove('hide');
                }
                if(files && files.length>0) {
                    userInfo.profileImg = files[0];
                    setIsProfileChanged(true);
                }else {
                    setIsProfileChanged(false);
                }
                
                if(upload) {
                    upload.classList.add('hide');
                }
            }else {
                imagesDestination[0].classList.add('hide');
                if(upload){
                    upload.classList.remove('hide');
                }
            }
        }

    }

    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInformations({
            ...userInformations,
            [e.target.name]: e.target.value
        })

    }

    const isValidFromInput = () => {
        if(
            !userInformations || !userInformations.email || !userInformations.firstname || !userInformations.lastname || !userInformations.adress ||
            !EMAIL_REG.test(userInformations.email) ||
            !FR_PHONE_NUMBER_FORMAT_REG.test(userInformations.phoneNumber)
        ) {
            return false;
        }
        return true;
    }

    const updateInformation = () => {

        if(isValidFromInput()) {
            userInfo.firstname = userInformations.firstname;
            userInfo.lastname = userInformations.lastname;
            userInfo.email = userInformations.email;
            userInfo.phoneNumber = userInformations.phoneNumber;
            console.log("....updating ")
            
            UserServices.updateUser(userId,userInfo).then((response) => {
                console.log("updated")
            }).catch((error) => {
                console.log("somme problems occured: please try again")
            })
            setIsEditModeActive(false);
        }else {
            setValidatebtnColor('red');
        }
    }
    return (
        <div className='p-1 mb-2'>
            {<>
                    {
                        responseMsg.message!=="" &&
                        <div className={`text-center ${responseMsg.style} w-100 p-1 flex space-around`}>
                            {responseMsg.message}
                            <button className='bg-none border-1 flex flex-end'
                                onClick={()=> responseMsg.type === 'refresh'? window.location.reload(): setResponseMsg({...responseMsg, message:"", type:""})}
                            >
                                {
                                    responseMsg.type==="refresh" ?
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
                    <div className="flex center">
                        <InputImgFile clickLoadImgFile={clickLoadImgFile} handleImageFileChange={handleImageFileChange} user={userInfo}/>
                        {
                            isProfileChanged && <AiOutlineSave fontSize={30} color={'green'} onClick={saveProfile}/>
                        }

                    </div>    
                    <h4 className="text-center mt-half">
                        {userInfo?.firstname+ " "+ userInfo?.lastname}
                    </h4>

                    <div className="container flex mt-1 wrap">
                        <div className={"relative border-1 br-1 auto mw-220 mt-half w-70"}>
                            <h4 className='text-center py-1 mt-2'>Mes </h4>
                            <div className="absolute top-0 right-0 p-half">
                                {
                                    !isEditModeActive?
                                        <BiEdit fontSize={26} onClick={(e) => setIsEditModeActive(true)} className='btn'/>
                                    :
                                        <AiOutlineCheck fontSize={26} color={validatebtnColor}  className='btn' onClick={updateInformation}/>
                                }
                            </div>
                            <div className="mt-1 p-1">
                                <div className="flex items-center py-half">
                                    <h4 className='w-30'>
                                        Nom: 
                                    </h4>

                                    {
                                        !isEditModeActive?
                                            <p className='px-1'>{userInfo?.lastname}</p>
                                        : <input 
                                            name='lastname'
                                            type="text" 
                                            className='w-70 br-half p-half mx-1' 
                                            value={userInformations.lastname}
                                            onChange={(e)=>handleInputChange(e)}
                                            required
                                        />
                                    }

                                </div>
                                <div className="flex items-center py-half">
                                    <h4 className='w-30'>
                                        Prenom: 
                                    </h4>

                                    {
                                        !isEditModeActive?
                                            <p className='px-1'>{userInfo?.firstname }</p>
                                        : <input 
                                            name='firstname'
                                            type="text" 
                                            className='w-70 br-half p-half mx-1' 
                                            value={userInformations.firstname}
                                            onChange={(e)=>handleInputChange(e)}
                                            required
                                        />
                                    }

                                    
                                </div>

                                <div className="flex items-center py-half">
                                    <h4 className='w-30'>
                                        mail: 
                                    </h4>

                                    {
                                        !isEditModeActive?
                                            <p className='px-1'>{userInfo?.email}</p>
                                        : <input 
                                            name='email'
                                            type="mail" 
                                            className='w-70 br-half p-half mx-1' 
                                            value={userInformations.email}
                                            onChange={(e)=>handleInputChange(e)}
                                            required
                                        />
                                    }

                                    
                                </div>

                                <div className="flex items-center py-half">
                                    <h4 className='w-30'>
                                        adresse: 
                                    </h4>

                                    {
                                        !isEditModeActive?
                                            <p className='px-1'>5 rue tyri, 64560, pau</p>
                                            : <input 
                                            name='adress'
                                            type="text" 
                                            className='w-70 br-half p-half mx-1' 
                                            value={userInformations.adress}
                                            onChange={(e)=>handleInputChange(e)}
                                            required
                                        />
                                    }
                                </div>

                                <div className="flex items-center py-half">
                                    <h4 className='w-30'>
                                        Tél: 
                                    </h4>

                                    {
                                        !isEditModeActive?
                                            <p className='px-1'>{userInfo?.phoneNumber}</p>
                                            : <input 
                                            name='phoneNumber'
                                            type="tel" 
                                            className='w-70 br-half p-half mx-1' 
                                            value={userInformations.phoneNumber}
                                            onChange={(e)=>handleInputChange(e)}
                                            required
                                        />
                                    }
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="container flex mt-1 wrap mb-2">
                        
                        {
                            userInfo?.roles.map(a => a.name).indexOf("USER")!==-1 && (
                                <ShowAnnounces userInfo={userInfo}/>
                            ) 

                        }

                        <div className="w-half relative border-1 br-1 auto mw-220 mt-half ">
                            <div className="m-half my-half auto overflow-scroll p-card-in">
                                <div className="flex center">
                                    <h3 className='text-center py-1'>Activités </h3>   
                                </div>
                                <div className="mt-1 p-1 flex wrap auto w-full">
                                    <div className="rounded-full util flex column center border bg-light-brown p-1 relative mx-1 my-1" onClick={()=> navigate("/app/user-profile/view/dmd")}>
                                        <GiOpenPalm fontSize={30} className="after"/>
                                        <small className='bold'>demandes</small>
                                    </div>

                                    <div className="rounded-full util flex column center border bg-light-blue p-1 relative mx-1 my-1" onClick={()=> navigate("/app/user-profile/view/candidacies")}>
                                        <GiShakingHands className='w-full' fontSize={25}/>
                                        <small className='bold'>Annonces</small>
                                    </div>

                                    <div className="rounded-full util flex column center border bg-light-move p-1 relative mx-1 my-1" onClick={() => navigate('/app/user-profile/view/roomates')}>
                                        <FaUsers className='w-full' fontSize={25}/>
                                        <small className='bold'>Colocs</small>
                                    </div>

                                    <div className="rounded-full util flex column center border bg-light-pink p-1 relative mx-1 my-1" onClick={() => navigate('/app/user-profile/view/task')}>
                                        <GrTask className='w-full' fontSize={25}/>
                                        <small className='bold'>Tâches</small>
                                    </div>

                                    <div className="rounded-full util flex column center border bg-light-sucess p-1 relative mx-1 my-1" onClick={() => navigate('/app/rooms/make-announce')}>
                                        <IoMdAddCircleOutline className='w-full' fontSize={25}/>
                                        <small className='bold'>Annonce</small>
                                    </div>

                                    <div className="rounded-full util flex column center border bg-light-gold p-1 relative mx-1 my-1" onClick={() => navigate('/app/user-profile/view/notifs')}>
                                        <IoMdNotificationsOutline className='w-full' fontSize={25}/>
                                        <small className='bold'>Notifs</small>
                                    </div>
                                </div>

                            </div>
                        </div>

                        
                    </div>

                    
                </>

            }
        </div>
    );
}

export default UserProfile;