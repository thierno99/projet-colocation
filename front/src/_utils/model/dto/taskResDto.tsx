import { UserResDto } from "./userResDto";

export class TaskResDto {
    id: string;
	title: string;
	description: string;
	status: string;
	priority: string;
	createdBy: UserResDto;
	assignedTo: UserResDto;
	createdAt: Date;

    constructor(
        id: string,
        title: string,
        description: string,
        status: string,
        priority: string,
        createdBy: UserResDto,
        assignedTo: UserResDto,
        createdAt: Date
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.createdBy = createdBy;
        this.assignedTo = assignedTo;
        this.createdAt = createdAt;
    }
}