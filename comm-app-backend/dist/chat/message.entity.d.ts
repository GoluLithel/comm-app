import { User } from '../users/user.entity';
import { ChatRoom } from './chat-room.entity';
export declare class Message {
    id: string;
    room: ChatRoom;
    sender: User;
    content: string;
    createdAt: Date;
}
