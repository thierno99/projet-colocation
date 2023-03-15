import { User } from "../user-model";

export class MessageResDto {
    id: string;
    sender: User;
    subject: string;
    content: string;
    sendAt: Date;
    users: User[];
    readBy: string[];

    constructor(id: string, sender: User, subject: string, content: string, sendAt: Date, users: User[], readBy: string[]) {
        this.id = id;
        this.sender = sender;
        this.subject = subject;
        this.content = content;
        this.sendAt = sendAt;
        this.users = users;
        this.readBy = readBy;
    }
}