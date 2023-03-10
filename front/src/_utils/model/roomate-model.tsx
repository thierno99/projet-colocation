export interface RoomateInterface{
    id: string;
    managerId: string;
    announceId: string;
    userIds: string[];
    
}

export class Roomate implements RoomateInterface{
    id: string;
    managerId: string;
    announceId: string;
    userIds: string[];

    constructor(
        id: string,
        managerId: string,
        announceId: string,
        userIds: string[],
    ) {
        this.id = id;
        this.managerId = managerId;
        this.announceId = announceId;
        this.userIds = userIds;
    }
    
}