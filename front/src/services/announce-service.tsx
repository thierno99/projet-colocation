import { ARoom, RoomsInterface } from "../_utils/model/rooms-model";
import Axios from "./axios.service";

const getAnnouncements = () => {
    return Axios.get('/announces/views').then((res)=> res.data);
}

const getAnnouncementById = (id: string) => {
    return Axios.get('/announces/announce/'+id).then((res)=> res.data);
}

const getAnnouncementsBetween = (start: number, end: number) => {
    return Axios.get(`/announces/announce/min-max?start=${start}&end=${end}`).then((res)=> {console.log(res.data); return res.data});
}

const postAnnouncement = (announce: ARoom) => {
    return Axios.post('/announces/save', announce);
}

const AnnounceService = {
    getAnnouncements,
    getAnnouncementById,
    getAnnouncementsBetween,
    postAnnouncement
}

export default AnnounceService;