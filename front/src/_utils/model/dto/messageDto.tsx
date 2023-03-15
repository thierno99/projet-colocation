export class MessageDto {
    senderId: string;
    subject: string;
    content: string;
    sendAt: Date;
    userIds: string[];
    readBy: string[];

    constructor(senderId: string, subject: string, content: string, sendAt: Date, userIds: string[], readBy: string[]) {
        this.senderId = senderId;
        this.subject = subject;
        this.content = content;
        this.sendAt = sendAt;
        this.userIds = userIds;
        this.readBy = readBy;
    }
}

export const defautlMessageDto = new MessageDto(
    "",
    "",
    "",
    new Date(),
    [],
    []
);