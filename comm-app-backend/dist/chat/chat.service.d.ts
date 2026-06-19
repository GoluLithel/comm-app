import { Repository } from 'typeorm';
import { ChatRoom } from './chat-room.entity';
import { Message } from './message.entity';
import { User } from '../users/user.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
export declare class ChatService {
    private readonly rooms;
    private readonly messages;
    private readonly users;
    constructor(rooms: Repository<ChatRoom>, messages: Repository<Message>, users: Repository<User>);
    createRoom(dto: CreateRoomDto): Promise<ChatRoom>;
    findAllRooms(): Promise<ChatRoom[]>;
    findRoom(id: string): Promise<ChatRoom>;
    updateRoom(id: string, dto: UpdateRoomDto): Promise<ChatRoom>;
    removeRoom(id: string): Promise<void>;
    createMessage(roomId: string, dto: CreateMessageDto): Promise<Message>;
    findRoomMessages(roomId: string): Promise<Message[]>;
    findMessage(id: string): Promise<Message>;
    updateMessage(id: string, dto: UpdateMessageDto): Promise<Message>;
    removeMessage(id: string): Promise<void>;
}
