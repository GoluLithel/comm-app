import { Message } from './message.entity';
export declare class ChatRoom {
    id: string;
    name: string;
    type: 'group' | 'dm';
    createdAt: Date;
    messages: Message[];
}
