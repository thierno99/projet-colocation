
export interface RoomsInterface {
    id: number;
    title: string;
    description: string;
    ownerId: number;
    city: string;
    postalCode: string;
    address: string;
    nbRoomatesSeached: number;
    publishedAt: Date;
    price: number;
    principalPicture: string;
    announceType: string;
    isOwnerCertified: boolean;
    roomType: string;
    roomfurnishedType: boolean;
    genderSearched: string[];
} 