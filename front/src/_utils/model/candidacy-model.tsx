
export interface candidacyInterface {
    id: string;
	announceId: string;
	ownerId: string;
	userId:string;
	status: string;
};

export class Candidacy implements candidacyInterface {
    id: string;
    announceId: string;
    ownerId: string;
    userId: string;
    status: string;
    
    constructor(
        id: string,
        announceId: string,
        ownerId: string,
        userId:string,
        status: string
    ) {
        this.id = id;
        this.announceId = announceId;
        this.ownerId = ownerId;
        this.userId = userId;
        this.status = status;
    }
}