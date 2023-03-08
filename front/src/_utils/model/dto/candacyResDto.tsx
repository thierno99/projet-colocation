import { RoomsInterface } from "../rooms-model";
import { UserInterface } from "../user-model";

export class CandidacyResponseDto {
	id: string;
	announce: RoomsInterface;
	user: UserInterface;
	status: string;
    
    constructor(
        id: string,
        announce: RoomsInterface,
        user: UserInterface,
        status: string,
    ) {
        this.id = id;
        this.announce = announce;
        this.user = user;
        this.status = status;
    }
    
}