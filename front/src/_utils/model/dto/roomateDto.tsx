export class RoomateD{
    managerId: string;
    announceId: string;
    userIds: string[];

    constructor(
        managerId: string,
        announceId: string,
        userIds: string[],
    ) {
        this.managerId = managerId;
        this.announceId = announceId;
        this.userIds = userIds;
    }    
}