
import defaultpng from '../../assets/Images/defaultpng.png';
export interface RoomsInterface {
    id: number;
    title: string;
    description: string;
    ownerId: number;
    state: string;
    city: string;
    postalCode: string;
    address: string;
    nbRoomatesSeached: number;
    publishedAt: Date;
    price: number;
    principalPicture: File;
    announceType: string;
    isOwnerCertified: boolean;
    roomType: string;
    roomfurnishedType: boolean;
    genderSearched: string[];
    images: File[];
}

export const DefaultAnnonce: RoomsInterface = {
    id: 0,
    title: "",
    description: "",
    ownerId: 0,
    state: "",
    city: "",
    postalCode: "",
    address: "",
    nbRoomatesSeached: 0,
    publishedAt: new Date(),
    price: 0,
    principalPicture: new File([''],''),
    announceType: "haveRoom",
    isOwnerCertified: false,
    roomType: "",
    roomfurnishedType: false,
    genderSearched: [],
    images: [],
}