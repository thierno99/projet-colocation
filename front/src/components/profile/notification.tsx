import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineReload, AiOutlineSend } from 'react-icons/ai';
import { BsFillReplyAllFill, BsReplyFill } from 'react-icons/bs';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { REFRESH } from '../../constants/constants';
import AccountServices from '../../services/account.service';
import MessageService from '../../services/message.service';
import RoomateService from '../../services/roomate.service';
import { replaceDotDot } from '../../_utils/functions/functions';
import { MessageResDto } from '../../_utils/model/dto/MessageResDto';
import { RoomateResDto } from '../../_utils/model/dto/roomateResDto';
import { UserResDto } from '../../_utils/model/dto/userResDto';
import { Message } from '../../_utils/model/message-model';
import Loader from '../shared/loader';
import Modal from '../shared/modals/modals';
import { defautlMessageDto, MessageDto } from './../../_utils/model/dto/messageDto';
import { UserInterface } from './../../_utils/model/dto/userResDto';

const isValid = (message: MessageDto): boolean => {
    if(
        !message || !message.senderId || message.senderId ==="" ||
        !message.userIds || message.userIds.length<=0 || 
        !message.content || message.content==="" ||
        !message.subject || message.subject === ""
    ){
        return false;
    }
    return true;
}

const Notification:FC<any> = (props) => {
    const [activePage, setActivePage] = useState("received");
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState(defautlMessageDto);
    const [replyMessage, setReplyMessage] = useState(defautlMessageDto);
    const [roomatesUsers, setRoomatesUsers] = useState(null as unknown as RoomateResDto);
    const [receivedMessageList, setReceivedMessage] = useState([] as MessageResDto[]);
    const [sendedMessageList, setSendedMessage] = useState([] as MessageResDto[]);
    const [includProprio, setIncludProprio] = useState(false);
    const [showEditMode, setShowEditMode] = useState(false);
    const [viewTheMessage, setViewTheMessage] = useState(null as unknown as MessageResDto);

    const [responseMsg, setResponseMsg] = useState(
        {
            message: "",
            style: "",
            type: ""
        }
    );

    const userId = (localStorage.getItem('userId') as string);


    useEffect(() => {
        MessageService.getMessageBySenderId(userId).then((message) => {
            const sendedMsg: MessageResDto[] = []
            message?.forEach((msg:any) => {

                const sender = new UserResDto(
                    msg?.sender.id,
                    msg?.sender.lastname,
                    msg?.sender.firstname,
                    msg?.sender.sexe,
                    msg?.sender.dateOfBirth,
                    msg?.sender.phoneNumber,
                    msg?.sender.email,
                    msg?.sender.password,
                    msg?.sender.isEmailVerified,
                    msg?.sender.iscertified,
                    msg?.sender.profileImg,
                    msg?.sender.autorizeHaldleTel,
                    msg?.sender.autorizeHaldleEmail,
                    msg?.sender.roles
                );

                const receivers: UserInterface[] = [];
                msg?.receivers?.forEach((u: any)=> {
                    const usr = new UserResDto(
                        u?.id,
                        u?.lastname,
                        u?.firstname,
                        u?.sexe,
                        u?.dateOfBirth,
                        u?.phoneNumber,
                        u?.email,
                        u?.password,
                        u?.isEmailVerified,
                        u?.iscertified,
                        u?.profileImg,
                        u?.autorizeHaldleTel,
                        u?.autorizeHaldleEmail,
                        u?.roles
                    ) 
                    receivers.push(usr);
                })

                const messageRes = new MessageResDto(
                    msg.id,
                    sender,
                    msg.subject,
                    msg.content,
                    msg.sendAt,
                    receivers,
                    msg.readBy
                );
                    
                sendedMsg.push(messageRes);
            })
            setSendedMessage(sendedMsg);
        })
        .catch((error) => {
            console.error(error);
        });

        MessageService.getMessageByUserId(userId).then((message) => {
            const receivededMsg: MessageResDto[] = []
            message?.forEach((msg:any) => {

                const received = new UserResDto(
                    msg?.sender.id,
                    msg?.sender.lastname,
                    msg?.sender.firstname,
                    msg?.sender.sexe,
                    msg?.sender.dateOfBirth,
                    msg?.sender.phoneNumber,
                    msg?.sender.email,
                    msg?.sender.password,
                    msg?.sender.isEmailVerified,
                    msg?.sender.iscertified,
                    msg?.sender.profileImg,
                    msg?.sender.autorizeHaldleTel,
                    msg?.sender.autorizeHaldleEmail,
                    msg?.sender.roles
                );

                const receivers: UserInterface[] = [];
                msg?.receivers?.forEach((u: any)=> {
                    const usr = new UserResDto(
                        u?.id,
                        u?.lastname,
                        u?.firstname,
                        u?.sexe,
                        u?.dateOfBirth,
                        u?.phoneNumber,
                        u?.email,
                        u?.password,
                        u?.isEmailVerified,
                        u?.iscertified,
                        u?.profileImg,
                        u?.autorizeHaldleTel,
                        u?.autorizeHaldleEmail,
                        u?.roles
                    ) 
                    receivers.push(usr);
                })

                const messageRes = new MessageResDto(
                    msg.id,
                    received,
                    msg.subject,
                    msg.content,
                    msg.sendAt,
                    receivers,
                    msg.readBy
                );
                    
                receivededMsg.push(messageRes);
            })

            setReceivedMessage(receivededMsg);
            setLoading(false);
        })
        .catch((error) => {
            console.error(error);
        });

        if(userId && userId !== "null") {
            RoomateService.getRoomateByUserId(userId)
            .then((res) => { 
                if(res) {
                    let users: UserInterface[] = []; 
                    res.roomates.forEach((usr:any) => users.push(
                        new UserResDto(
                            usr.id,
                            usr.lastname,
                            usr.firstname,
                            usr.sexe,
                            usr.dateOfBirth,
                            usr.phoneNumber,
                            usr.email,
                            usr.password,
                            usr.isEmailVerified,
                            usr.iscertified,
                            usr.profileImg,
                            usr.autorizeHaldleTel,
                            usr.autorizeHaldleEmail,
                            usr.roles
                        ) 
                    ));
    
                    const roomatesTmp = new RoomateResDto(res.id, res.manager, res.announce,users);
                    // setNoRoomates("");
                    setRoomatesUsers(roomatesTmp);
                }else {
                    // setNoRoomates("Vous n'avez pas de Colocataire pour le moment");
                }
            })
            .catch(error => {
                console.log(error);
                if(error.code === "ERR_NETWORK") {
                    AccountServices.logout();
                }
            });
        }
        // roomate.roomates.map((roomate: any) => roomate?.id)
    }, [userId])
    

    const closeModal = () => {
        const body = document.querySelector('body');
        if(body) {
            if(body.classList.contains("active-modal")) {
                body.classList.remove('active-modal');
            }
        }
        setActivePage("send");
        closeViewModal();
    }
    const closeViewModal = () => {
        const body = document.querySelector('body');
        if(body) {
            if(body.classList.contains("active-modal")) {
                body.classList.remove('active-modal');
            }
        }
        setShowEditMode(false);
        setViewTheMessage(null as unknown as MessageResDto);
    }

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const options = event.target.options;
        
        const selectedValues = [];
        for (let i = 0; i < options.length; i++) {
          if (options[i].selected) {
            selectedValues.push(options[i].value);
          }
        }
        setNewMessage({
            ...newMessage,
            userIds: selectedValues.filter(s=> s!==userId)
        })
    };

    const handleSelectAllDestChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked){
            setNewMessage({
                ...newMessage,
                userIds: roomatesUsers?.roomates?.filter(user=> user.id!==userId).map((roomate: any) => roomate?.id)
            })
        }else {
            setNewMessage({
                ...newMessage,
                userIds: []
            })
        }
    }

    const handleAddProprioChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIncludProprio(e.target.checked)
    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewMessage({
            ...newMessage,
            [e.target.name]: e.target.value
        })
    }

    const handleTexteAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewMessage({
            ...newMessage,
            [e.target.name]: e.target.value
        })
    }

    const replyAll = () => {
        replyMessage.senderId = userId;
        replyMessage.userIds = viewTheMessage.users.filter(user=>user.id !== userId).map(user=>user.id);
        replyMessage.userIds.push(viewTheMessage.sender.id);
        setShowEditMode(true)
    } 

    const replyTheMessage = () => {
        replyMessage.senderId = userId;
        replyMessage.userIds = [viewTheMessage.sender.id]
        setShowEditMode(true);
    }
    

    const sendMessage = () => {
        let message: MessageDto;
        if(showEditMode){
            message = replyMessage;
        }else {
            message = newMessage;
        }
        if(includProprio) {
            if(message.userIds.indexOf(roomatesUsers?.manager?.id)===-1)
                message.userIds.push(roomatesUsers?.manager?.id);
        }else {
            const index = message.userIds.indexOf(roomatesUsers?.manager?.id);
            if(index!==-1)
                message.userIds.splice(index,1);
        }
        message.senderId = userId;
        message.sendAt = new Date();
        if(isValid(message)) {
            
            MessageService.saveMessage(message).then(() => {
                setResponseMsg({
                    message: "envoyé !",
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
        }else {
            setResponseMsg({
                message: "Veillez remplir tous les champs svp!",
                style: "danger",
                type: 'quit'
            });
        }

        console.log(message);
        message.readBy = [];
        closeModal()
    }

    const viewMessage = (sendedMsg: MessageResDto) => {
        
        if(sendedMsg) {
            if(!sendedMsg.readBy || sendedMsg.readBy?.indexOf(userId)===-1) {
                let readBy: string[] = [];
                if(sendedMsg.readBy && sendedMsg.readBy.length >0) {
                    readBy = sendedMsg.readBy;
                }
                readBy.push(userId);
                const msg = new Message(
                    sendedMsg.id,
                    sendedMsg.sender.id,
                    sendedMsg.subject,
                    sendedMsg.content,
                    sendedMsg.sendAt,
                    roomatesUsers?.roomates?.map((roomate: any) => roomate?.id),
                    readBy
                );

                MessageService.updateMessage(msg)
                .then((res)=> {
                    console.log(res.data.readBy.indexOf(userId));
                    // setIchanged(!ichanged);
                    // setIchanged(!ichanged);
                })
                .catch((err)=> {
                    console.log(err);
                    return;
                });
            }
        }
        setViewTheMessage(sendedMsg);
    }

    
    const handleReplyInputMessage = (e: ChangeEvent<HTMLInputElement>) => {
        setReplyMessage({
            ...replyMessage,
            [e.target.name]: e.target.value
        })
    }

    const handleReplyTexteAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setReplyMessage({
            ...replyMessage,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='w-100 relative'>
            {
                (loading || !roomatesUsers || !roomatesUsers.announce || roomatesUsers.roomates.length<=0 )?
                (
                    loading?
                    <Loader/>:
                    <div className='w-full my-1 text-center text-gray'>
                        <h2>Vous N'avez Pas de Colocataire pour le moment</h2>
                    </div>
                )
                :
            
                <>
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
                    <div className="container relative br-1 auto mt-half">
                        <div className="w-100 flex space-between my-3">

                            <div 
                                className={"w-40 p-half border-1 flex center"+ (activePage==="received"?" bg-light-gold":" pointer")}
                                onClick={()=>setActivePage("received")}
                            >
                                <h3>reçus</h3>
                            </div>

                            <div 
                                className={"w-40 p-half border-1 flex center"+ (activePage==="send"?" bg-light-gold":" pointer")}
                                onClick={()=>setActivePage("send")}
                            >
                                <h3>Envoyés</h3>
                            </div>

                            <div 
                                className="w-20 flex center pointer bg-light-blue"
                                onClick={()=>setActivePage("new")}
                            >
                                <IoMdAddCircleOutline fontSize={25}/>
                                <AiOutlineSend fontSize={35}/>
                            </div>

                        </div>

                        <div className="flex center">
                            <h4 className='text-center py-1'>Echanges et Notifs </h4>   
                        </div>
                    
                        <div className="mt-1 p-1">
                            {
                                activePage==="send" && sendedMessageList?.map(sendedMsg => {
                                    return (
                                        <div key={sendedMsg.id}>
                                            <div className="flex space-between p-1 hover-light-blue pointer"  onClick={()=>viewMessage(sendedMsg)}>
                                                <p> à 
                                                    {
                                                        sendedMsg.users.map(usr => " "+usr.firstname + ",")
                                                    }
                                                </p>
                                                <p>{replaceDotDot(sendedMsg.content,40)}</p>
                                                <p>{new Intl.DateTimeFormat('fr-FR').format(new Date(sendedMsg.sendAt))+""}</p>
                                            </div>
                                            <hr />
                                        </div>
                                    )
                                })
                            }
                            {
                                activePage==="received" && receivedMessageList?.map(sendedMsg => {
                                    return (
                                        <div key={sendedMsg.id}>
                                            <div className={"flex space-between p-1 pointer hover-light-blue" + ((!sendedMsg.readBy || sendedMsg.readBy?.indexOf(userId)===-1)?" bold":"")} onClick={()=>viewMessage(sendedMsg)}>
                                                <p>
                                                    {
                                                        sendedMsg.sender.firstname
                                                    }
                                                </p>
                                                <p>{replaceDotDot(sendedMsg.content,40)}</p>
                                                <p>{new Intl.DateTimeFormat('fr-FR').format(new Date(sendedMsg.sendAt))+""}</p>
                                            </div>
                                            <hr />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {
                        activePage==="new" &&
                        <Modal closeModal={closeModal}> 
                            <div className="container p-half">
                                <h3>Destinataires</h3>
                                <div className='my-1'>
                                    <div className="flex center my-1">
                                        <h4 className='mr-1'>Envoyer à tous vos colocs</h4>
                                        <input type="checkbox" name="all" id="all" onChange={(e) => handleSelectAllDestChange(e)}/>
                                    </div>

                                    <div className="flex center my-1">
                                        <h4 className='mr-1'>Ajouter le proprio en copie</h4>
                                        <input type="checkbox" name="all" id="all" onChange={(e) => handleAddProprioChange(e)}/>
                                    </div>
                                    <select 
                                        multiple 
                                        defaultValue={newMessage.userIds}
                                        onChange={(e)=>handleSelectChange(e)}
                                        className="w-full select p-half"
                                    >
                                        {
                                            roomatesUsers?.roomates?.map((roomate: any) => roomate?.id).map((roomId,index) => {
                                                if(roomId!==userId)
                                                return (
                                                    <>
                                                        <option 
                                                            key={roomId}
                                                            value={roomId} 
                                                            selected={newMessage.userIds.includes(roomId)}
                                                        >
                                                            {roomatesUsers.roomates[index].firstname +' ' + roomatesUsers.roomates[index].lastname}
                                                        </option>
                                                    </>
                                                )
                                                return null;
                                            })
                                        }
                                    </select>
                                </div>

                                <div className='my-1'>
                                    <h4>Sujet:</h4>
                                    <input 
                                        type="text" 
                                        name="subject" 
                                        id="subject" 
                                        placeholder="j'ai crée une tâche si quelu'un pouvait ..." 
                                        className='w-full p-half'
                                        value={newMessage.subject}
                                        onChange={(e) => handleInputChange(e)}
                                />
                                </div>

                                <div className='my-1'>
                                    <h4>Allez-y :)</h4>
                                    <textarea 
                                        name="content" 
                                        id="content" 
                                        cols={100} 
                                        rows={10} 
                                        className="w-full p-half" 
                                        value={newMessage.content}
                                        onChange={(e)=> handleTexteAreaChange(e)}
                                    >

                                    </textarea>
                                </div>

                                <div className="flex flex-end w-full my-1">
                                    <button className='flex center p-half px-2' onClick={sendMessage}>
                                        <AiOutlineSend fontSize={35} color={"#042054"}/>
                                    </button>
                                </div>
                            </div>
                        </Modal>

                    }

                    {
                        viewTheMessage &&
                            <Modal closeModal={closeViewModal}> 
                            <>
                                {
                                    !showEditMode &&
                                    <div className='my-2 overflow-sroll'>
                                        <h4 className='text-center'>de {viewTheMessage.sender.id!==userId?viewTheMessage.sender.firstname:"Moi"}</h4>
                                        <p className='text-center'>à</p> 
                                        <h5 className='text-center'>{viewTheMessage.sender.id!==userId?"Moi, ":null} {viewTheMessage.users.filter(user=> user.id !== userId && user.id!== viewTheMessage.sender.id).map(usr => usr.firstname)}</h5>
                                        <div className='w-80 auto flex center my-1'>
                                            <h4>sujet:</h4>
                                            <p className='pl-1'>{viewTheMessage.subject}</p>
                                        </div>
                                        <p className="m-2 p-1 bg-light w-70 auto br-1 mh-250 my-1 word-wrap">
                                            {viewTheMessage.content}
                                        </p>

                                        {
                                            viewTheMessage.sender.id!==userId &&

                                            <div className="flex flex-end w-80 auto">
                                                <button 
                                                    className='px-1 py-half mr-1 pointer bg-light-gold reply flex center'
                                                    onClick={replyTheMessage}
                                                >
                                                    <BsReplyFill fontSize={20}/>
                                                </button>
                                                {
                                                    viewTheMessage.users.filter(user=> user.id !== userId && user.id!== viewTheMessage.sender.id).length>0?
                                                    <button 
                                                        className='px-1 py-half mr-1 pointer bg-light-gold reply-all flex center'
                                                        onClick={replyAll}
                                                    >
                                                        <BsFillReplyAllFill/>
                                                    </button>: null
                                                }
                                            </div>
                                        }

                                    </div>
                                }

                                {
                                    showEditMode && <div className="container p-half w-80 auto">
                                        <h3>Destinataires</h3>
                                        <div className='my-1'>

                                            <div className="flex center my-half">
                                                <h4 className='mr-half'>Ajouter le proprio en copie</h4>
                                                <input type="checkbox" name="all" id="all" onChange={(e) => handleAddProprioChange(e)}/>
                                            </div>
                                            <h4>
                                                {
                                                    roomatesUsers?.roomates?.map((roomate: any) => roomate?.id).map((roomId,index) => {
                                                        if(roomId!==userId && replyMessage.userIds.indexOf(roomId)!==-1)
                                                        return (
                                                            <>
                                                                <h4 
                                                                >
                                                                    {roomatesUsers.roomates[index].firstname +' ' + roomatesUsers.roomates[index].lastname}
                                                                </h4>
                                                            </>
                                                        )
                                                        return null;
                                                    })
                                                }
                                            </h4>
                                        </div>

                                        <div className='my-1'>
                                            <h4>Sujet:</h4>
                                            <input 
                                                type="text" 
                                                name="subject" 
                                                id="subject" 
                                                placeholder="j'ai crée une tâche si quelu'un pouvait ..." 
                                                className='w-full p-half'
                                                value={replyMessage.subject}
                                                onChange={(e) => handleReplyInputMessage(e)}
                                        />
                                        </div>

                                        <div className='my-1'>
                                            <h4>Allez-y :)</h4>
                                            <textarea 
                                                name="content" 
                                                id="content" 
                                                cols={100} 
                                                rows={10} 
                                                className="w-full p-half" 
                                                value={replyMessage.content}
                                                onChange={(e)=> handleReplyTexteAreaChange(e)}
                                            >

                                            </textarea>
                                        </div>
                                        <div className="flex flex-end w-full my-1">
                                            <button className='flex center p-half px-2' onClick={sendMessage}>
                                                <AiOutlineSend fontSize={35} color={"#042054"}/>
                                            </button>
                                        </div>
                                    </div>
                                }
                            </>
                        </Modal>
                    }
                </>
            }
        </div>
    );
}

export default Notification;