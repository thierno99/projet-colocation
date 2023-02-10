import Axios from "./axios.service";

const getAnnouncements = () => {
    return Axios.get('/announces/views');
}

const AnnounceService = {
    getAnnouncements,
}

export default AnnounceService;