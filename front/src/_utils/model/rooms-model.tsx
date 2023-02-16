
export interface RoomsInterface {
    id: string;
    title: string;
    description: string;
    ownerId: string;
    state: string;
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
    images: File[];
} 

export class Room implements RoomsInterface {
    id: string;
    title: string;
    description: string;
    ownerId: string;
    state: string;
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
    images: File[];


    constructor(
        id: string = "",
        title: string = "",
        description: string = "",
        ownerId: string = "",
        state: string = "",
        city: string = "",
        postalCode: string = "",
        address: string = "",
        nbRoomatesSeached: number = 2,
        publishedAt: string = "",
        price: number = 0,
        principalPicture: string = "",
        announceType: string = "",
        isOwnerCertified: boolean,
        roomType: string = "",
        roomfurnishedType: boolean,
        genderSearched: string[] = [],
        images: File[] = [],
    ) {
      this.id = id;
      this.title = title;
      this.isOwnerCertified = isOwnerCertified;
      this.roomType = roomType;
      this.roomfurnishedType = roomfurnishedType;
      this.genderSearched = genderSearched;
      this.description = description;
      this.ownerId = ownerId;
      this.state = state;
      this.city = city;
      this.postalCode = postalCode;
      this.address = address;
      this.nbRoomatesSeached = nbRoomatesSeached;
      this.publishedAt = new Date(publishedAt);
      this.price = price;
      this.principalPicture = principalPicture;
      this.announceType = announceType;
      this.images = images;
    }   
}

export const DefaultAnnonce: RoomsInterface = {
    id: "",
    title: "",
    description: "",
    ownerId: "",
    state: "",
    city: "",
    postalCode: "",
    address: "",
    nbRoomatesSeached: 0,
    publishedAt: new Date(),
    price: 0,
    principalPicture: "",
    // principalPicture: new File([''],''),
    announceType: "haveRoom",
    isOwnerCertified: false,
    roomType: "",
    roomfurnishedType: false,
    genderSearched: [],
    images: [],
}