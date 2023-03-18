export class TaskDto {
	title: string;
	description: string;
	status: string;
	priority: string;
	createdBy: string;
	assignedTo: string;
	createdAt: Date;

    constructor(
        title: string,
        description: string,
        status: string,
        priority: string,
        createdBy: string,
        assignedTo: string,
        createdAt: Date
    ) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.createdBy = createdBy;
        this.assignedTo = assignedTo;
        this.createdAt = createdAt;
    }
}

export const defaultTaskDto = new TaskDto(
    "",
    "",
    "",
    "Moyenne",
    "",
    "",
    new Date()
);