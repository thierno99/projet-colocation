export class Message {
    id: string;
    senderId: string;
    subject: string;
    content: string;
    sendAt: Date;
    userIds: string[];
    readBy: string[];

    constructor(id: string, senderId: string, subject: string, content: string, sendAt: Date, userIds: string[], readBy: string[]) {
        this.id = id;
        this.senderId = senderId;
        this.subject = subject;
        this.content = content;
        this.sendAt = sendAt;
        this.userIds = userIds;
        this.readBy = readBy;
    }
}