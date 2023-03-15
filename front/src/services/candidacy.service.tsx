import { Candidacy } from "../_utils/model/candidacy-model";
import { CandidacyDto } from "../_utils/model/dto/CandidacyDto";
import Axios from "./axios.service";

const saveCandidacy = (candidacy: CandidacyDto) => {
    return Axios.post('/candidacy/save', candidacy);
}

const updateCandidacyStatus = (candidacy: Candidacy) => {
    return Axios.post('/candidacy/update/', candidacy);
}

const getCandidacyById = async (id: string) => {
    const res = await Axios.get('/candidacy/get/' + id);
    return res.data;
}

const getCandidacyByOwnerId = async (ownerId: string) => {
    const res = await Axios.get('/candidacy/getbyownerid/' + ownerId);
    return res.data;
}

const getCandidacyByUserId = async (userId: string) => {
    const res = await Axios.get('/candidacy/getbyuserid/' + userId);
    return res.data;
}

const getByOwnerIdAndAnnounceIdAndUserId = async (ownerId: string, announceId: string, userId: string) => {
    return await Axios.get(`/candidacy/get?ownerId=${ownerId}&announceId=${announceId}&userId=${userId}`).then((res)=> {return res.data});
}

const removeCandidacy = (candidacyId: string) => {
    return Axios.delete(`/candidacy/del/${candidacyId}`);
}

const CandidacyService = {
    saveCandidacy,
    updateCandidacyStatus,
    getCandidacyById,
    getCandidacyByOwnerId,
    getCandidacyByUserId,
    getByOwnerIdAndAnnounceIdAndUserId,
    removeCandidacy,
}

export default CandidacyService;