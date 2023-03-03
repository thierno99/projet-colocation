import React, { FC, useEffect, useState } from 'react';
import { ImFinder } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import UserServices from '../../../services/user.service';
import { formatLongText } from '../../../_utils/functions/functions';
import { User } from '../../../_utils/model/user-model';
import { ButtonPrimary } from '../buttons/Buttons';

// import { CardProps } from "../Interfaces";

const RowCard:FC<any> = (props) => {
    const {ownerId, description, urlStr} = props;
    const [user, setUser] = useState(null as unknown as User);
    const navigate = useNavigate();

    useEffect(() => {

        UserServices.getUserById(ownerId).then((userInfo) => {
            let user = new User(
                userInfo.lastname,
                userInfo.firstname,
                userInfo.sexe,
                userInfo.dateOfBirth,
                userInfo.phoneNumber,
                userInfo.email,
                userInfo.password,
                userInfo.isEmailVerified,
                userInfo.iscertified,
                userInfo.profileImg,
                userInfo.autorizeHaldleTel,
                userInfo.autorizeHaldleEmail,
                userInfo.roles
            );
            user.id = ownerId;
            setUser(user);
        })
    }, [ownerId])
    
    return (
        <div className='row-card relative pointer w-100 flex space-between wrap sm-column' onClick={() =>navigate(urlStr)}>
            <div className="row-card-image flex j-center">
                {
                    user?.profileImg ?(
                        <img src={`data:image/png;base64,${user?.profileImg}`} alt={user?.lastname} className="rounded-full small-circle-img"/>
                    ):
                    (
                        <ImFinder fontSize={100} color={'pink'}/>
                    )
                }
            </div>

            <div className="row-card-body">
                <h3 className="card-title">
                    {user?.firstname + ' ' + user?.lastname}
                </h3>

                {
                    
                }
                    {
                        formatLongText(description,4).map((des,i) => {
                            return <p key={i}>{des} <br/> </p>
                        })
                    }
            </div>

            <div className="row-card-bottom flex center">
                <ButtonPrimary title={'je decouvre'} to={urlStr} classes={['bg-light-blue b-none mx-1 h-b']} />
            </div>
        </div>
    );
}

export default RowCard;