import { ChatService } from './chat.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
export declare class ChatController {
    private readonly chat;
    constructor(chat: ChatService);
    createRoom(dto: CreateRoomDto): Promise<import("./chat-room.entity").ChatRoom>;
    findAllRooms(): Promise<import("./chat-room.entity").ChatRoom[]>;
    findRoom(id: string): Promise<import("./chat-room.entity").ChatRoom>;
    updateRoom(id: string, dto: UpdateRoomDto): Promise<import("./chat-room.entity").ChatRoom>;
    removeRoom(id: string): Promise<void>;
    createMessage(roomId: string, dto: CreateMessageDto): Promise<import("./message.entity").Message>;
    listMessages(roomId: string): Promise<import("./message.entity").Message[]>;
    findMessage(id: string): Promise<import("./message.entity").Message>;
    updateMessage(id: string, dto: UpdateMessageDto): Promise<import("./message.entity").Message>;
    removeMessage(id: string): Promise<void>;
}
