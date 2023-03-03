import { ARoom } from "../_utils/model/rooms-model";
import Axios from "./axios.service";

const getAnnouncements = () => {
    return Axios.get('/announces/views').then((res)=> res.data);
}

const getAnnouncementById = (id: string) => {
    return Axios.get('/announces/announce/'+id).then((res)=> res.data);
}

const getAnnouncementsBetween = (start: number, end: number) => {
    return Axios.get(`/announces/announce/min-max?start=${start}&end=${end}`).then((res)=> {return res.data});
}

const postAnnouncement = (announce: ARoom) => {
    return Axios.post('/announces/save', announce);
}

const deleteAnnounceById = (announceId: string) => {
    return Axios.delete('/announces/announce/'+ announceId);
}

const saveAnnounce = (formdata: FormData) => {
    return Axios.post('/announces/saveannounce', formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
    });
}
const AnnounceService = {
    getAnnouncements,
    getAnnouncementById,
    getAnnouncementsBetween,
    postAnnouncement,
    saveAnnounce,
    deleteAnnounceById,
}

export default AnnounceService;