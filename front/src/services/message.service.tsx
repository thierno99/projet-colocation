import { MessageDto } from "../_utils/model/dto/messageDto";
import { Message } from "../_utils/model/message-model";
import Axios from "./axios.service";

const saveMessage = (message: MessageDto) => {
    return Axios.post('/message/save', message);
}

const updateMessage = (message: Message) => {
    return Axios.put('/message/update', message);
}

const getMessageBySenderId = async (senderId: string) => {
    const res = await Axios.get('/message/send/' + senderId);
    return res.data;
}

const getMessageByUserId = async (userId: string) => {
    const res = await Axios.get('/message/receive/' + userId);
    return res.data;
}

const removeMessage = (messageId: string) => {
    return Axios.delete('/message/del/' + messageId);
}

const MessageService = {
    saveMessage,
    updateMessage,
    getMessageBySenderId,
    getMessageByUserId,
    removeMessage,
};

export default MessageService;