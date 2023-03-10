import { ARoom } from "../_utils/model/rooms-model";
import Axios from "./axios.service";

const getAnnouncements = async () => {
    const res = await Axios.get('/announces/views');
    return res.data;
}

const getAnnouncementById = async (id: string) => {
    const res = await Axios.get('/announces/announce/' + id);
    return res.data;
}

const getAnnouncementsBetween = async (start: number, end: number) => {
    const res = await Axios.get(`/announces/announce/min-max?start=${start}&end=${end}`);
    return res.data;
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

const editAnnounce = (formdata: FormData) => {
    return Axios.post('/announces/editannounce', formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
    });
}


const editAnnouncebin = (formdata: FormData) => {
    return Axios.post('/announces/editannounce/bin', formdata, {
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
    editAnnounce,
    editAnnouncebin,
}

export default AnnounceService;