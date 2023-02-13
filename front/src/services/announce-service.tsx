import Axios from "./axios.service";

const getAnnouncements = () => {
    return Axios.get('/announces/views').then((res)=> res.data);
}

const AnnounceService = {
    getAnnouncements,
}

export default AnnounceService;