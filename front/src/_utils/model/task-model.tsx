export interface TaskInterface {
    id: string;
	title: string;
	description: string;
	status: string;
	priority: string;
	createdBy: string;
	assignedTo: string;
	createdAt: Date;
}

export class Task implements TaskInterface {
    id: string;
	title: string;
	description: string;
	status: string;
	priority: string;
	createdBy: string;
	assignedTo: string;
	createdAt: Date;

    constructor(
        id: string,
        title: string,
        description: string,
        status: string,
        priority: string,
        createdBy: string,
        assignedTo: string,
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