import Axios from "./axios.service";

const getAnnouncements = () => {
    return Axios.get('/announces/views').then((res)=> res.data);
}

const getAnnouncementById = (id: string) => {
    return Axios.get('/announces/announce/'+id).then((res)=> res.data);
}

const AnnounceService = {
    getAnnouncements,
    getAnnouncementById,
}

export default AnnounceService;