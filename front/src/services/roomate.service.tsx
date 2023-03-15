import axios from "axios";
import Axios from "./axios.service"

const saveRoomate = (formData: FormData) => {
    return Axios.post(`/roomate/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
    })
}

const getRoomate = async (managerId: string, announceId: string) => {
    const res = await Axios.get(`/roomate/common?managerId=${managerId}&announceId=${announceId}`);
    return res.data;
}

const getRoomateByAnnounceId = async (announceId: string) => {
    const res = await Axios.get(`/roomate/getbyaid?announceId=${announceId}`);
    return res.data;
}

const getRoomateByUserId = async (userId: string) => {
    const res = await Axios.get(`/roomate/getbyuid?userId=${userId}`);
    return res.data;
}

const removeUserToRoomate = async (managerId: string, userId: string, announceId: string) => {
    const res = await axios.delete(`/roomate/delete-user?managerId=${managerId}&userId=${userId}&announceId=${announceId}`);
    return res.data;
}

const RoomateService = {
    saveRoomate,
    getRoomate,
    getRoomateByAnnounceId,
    getRoomateByUserId,
    removeUserToRoomate,
};

export default RoomateService;