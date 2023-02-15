
export interface RoomsInterface {
    id: string;
    title: string;
    description: string;
    ownerId: string;
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

export class Room implements RoomsInterface {
    id: string;
    title: string;
    description: string;
    ownerId: string;
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

    constructor(
        id: string = "",
        title: string = "",
        description: string = "",
        ownerId: string = "",
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
        genderSearched: string[] = []
    ) {
      this.id = id;
      this.title = title;
      this.isOwnerCertified = isOwnerCertified;
      this.roomType = roomType;
      this.roomfurnishedType = roomfurnishedType;
      this.genderSearched = genderSearched;
      this.description = description;
      this.ownerId = ownerId;
      this.city = city;
      this.postalCode = postalCode;
      this.address = address;
      this.nbRoomatesSeached = nbRoomatesSeached;
      this.publishedAt = new Date(publishedAt);
      this.price = price;
      this.principalPicture = principalPicture;
      this.announceType = announceType;
    }   
}