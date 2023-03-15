import { RoomsInterface } from "../rooms-model";
import { User } from "../user-model";

export class RoomateResDto {
    id: string;
	manager: User;
	announce: RoomsInterface;
    roomates: User[];

    constructor(
        id: string,
        manager: User,
        announce: RoomsInterface,
        roomates: User[]
    ) {
        this.id = id;
        this.manager = manager;
        this.announce = announce;
        this.roomates = roomates;
    }
}