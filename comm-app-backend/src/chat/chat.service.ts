import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoom } from './chat-room.entity';
import { Message } from './message.entity';
import { User } from '../users/user.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRoom)
    private readonly rooms: Repository<ChatRoom>,
    @InjectRepository(Message)
    private readonly messages: Repository<Message>,
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  // ---------- rooms ----------
  createRoom(dto: CreateRoomDto): Promise<ChatRoom> {
    const room = this.rooms.create({ name: dto.name, type: dto.type ?? 'group' });
    return this.rooms.save(room);
  }

  findAllRooms(): Promise<ChatRoom[]> {
    return this.rooms.find({ order: { createdAt: 'ASC' } });
  }

  async findRoom(id: string): Promise<ChatRoom> {
    const room = await this.rooms.findOne({ where: { id } });
    if (!room) throw new NotFoundException(`Room ${id} not found`);
    return room;
  }

  async updateRoom(id: string, dto: UpdateRoomDto): Promise<ChatRoom> {
    const room = await this.findRoom(id);
    Object.assign(room, dto);
    return this.rooms.save(room);
  }

  async removeRoom(id: string): Promise<void> {
    const result = await this.rooms.delete(id);
    if (!result.affected) throw new NotFoundException(`Room ${id} not found`);
  }

  // ---------- messages ----------
  async createMessage(roomId: string, dto: CreateMessageDto): Promise<Message> {
    const room = await this.findRoom(roomId);
    const sender = await this.users.findOne({ where: { id: dto.senderId } });
    if (!sender) throw new NotFoundException(`User ${dto.senderId} not found`);
    const msg = this.messages.create({ room, sender, content: dto.content });
    return this.messages.save(msg);
  }

  async findRoomMessages(roomId: string): Promise<Message[]> {
    await this.findRoom(roomId);
    return this.messages.find({
      where: { room: { id: roomId } },
      relations: { sender: true },
      order: { createdAt: 'ASC' },
    });
  }

  async findMessage(id: string): Promise<Message> {
    const msg = await this.messages.findOne({
      where: { id },
      relations: { sender: true, room: true },
    });
    if (!msg) throw new NotFoundException(`Message ${id} not found`);
    return msg;
  }

  async updateMessage(id: string, dto: UpdateMessageDto): Promise<Message> {
    const msg = await this.findMessage(id);
    msg.content = dto.content;
    return this.messages.save(msg);
  }

  async removeMessage(id: string): Promise<void> {
    const result = await this.messages.delete(id);
    if (!result.affected) throw new NotFoundException(`Message ${id} not found`);
  }
}
