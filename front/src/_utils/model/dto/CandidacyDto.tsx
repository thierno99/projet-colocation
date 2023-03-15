export class CandidacyDto {
    announceId: string;
    ownerId: string;
    userId: string;
    status: string;
    
    constructor(
        announceId: string,
        ownerId: string,
        userId:string,
        status: string
    ) {
        this.announceId = announceId;
        this.ownerId = ownerId;
        this.userId = userId;
        this.status = status;
    }
}