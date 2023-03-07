
export class Announce {
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
    announceType: string;
    ownerCertified: boolean;
    roomType: string;
    roomfurnishedType: boolean;
    genderSearched: string[];

    constructor(
        title: string,
        description: string,
        ownerId: string,
        state: string,
        city: string,
        postalCode: string,
        address: string,
        nbRoomatesSeached: number,
        publishedAt: Date,
        price: number,
        announceType: string,
        ownerCertified: boolean,
        roomType: string,
        roomfurnishedType: boolean,
        genderSearched: string[],
    ) {
        this.title = title;
        this.description = description;
        this.ownerId = ownerId;
        this.state = state;
        this.city = city;
        this.postalCode = postalCode;
        this.address = address;
        this.nbRoomatesSeached = nbRoomatesSeached;
        this.publishedAt = publishedAt;
        this.price = price;
        this.announceType = announceType;
        this.ownerCertified = ownerCertified;
        this.roomType = roomType;
        this.roomfurnishedType = roomfurnishedType;
        this.genderSearched = genderSearched;
    }
}



export class AnnounceDTO {
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
    announceType: string;
    ownerCertified: boolean;
    roomType: string;
    roomfurnishedType: boolean;
    genderSearched: string[];

    constructor(
        id: string,
        title: string,
        description: string,
        ownerId: string,
        state: string,
        city: string,
        postalCode: string,
        address: string,
        nbRoomatesSeached: number,
        publishedAt: Date,
        price: number,
        announceType: string,
        ownerCertified: boolean,
        roomType: string,
        roomfurnishedType: boolean,
        genderSearched: string[],
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.ownerId = ownerId;
        this.state = state;
        this.city = city;
        this.postalCode = postalCode;
        this.address = address;
        this.nbRoomatesSeached = nbRoomatesSeached;
        this.publishedAt = publishedAt;
        this.price = price;
        this.announceType = announceType;
        this.ownerCertified = ownerCertified;
        this.roomType = roomType;
        this.roomfurnishedType = roomfurnishedType;
        this.genderSearched = genderSearched;
    }
}