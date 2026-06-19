"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const chat_room_entity_1 = require("./chat-room.entity");
const message_entity_1 = require("./message.entity");
const user_entity_1 = require("../users/user.entity");
let ChatService = class ChatService {
    rooms;
    messages;
    users;
    constructor(rooms, messages, users) {
        this.rooms = rooms;
        this.messages = messages;
        this.users = users;
    }
    createRoom(dto) {
        const room = this.rooms.create({ name: dto.name, type: dto.type ?? 'group' });
        return this.rooms.save(room);
    }
    findAllRooms() {
        return this.rooms.find({ order: { createdAt: 'ASC' } });
    }
    async findRoom(id) {
        const room = await this.rooms.findOne({ where: { id } });
        if (!room)
            throw new common_1.NotFoundException(`Room ${id} not found`);
        return room;
    }
    async updateRoom(id, dto) {
        const room = await this.findRoom(id);
        Object.assign(room, dto);
        return this.rooms.save(room);
    }
    async removeRoom(id) {
        const result = await this.rooms.delete(id);
        if (!result.affected)
            throw new common_1.NotFoundException(`Room ${id} not found`);
    }
    async createMessage(roomId, dto) {
        const room = await this.findRoom(roomId);
        const sender = await this.users.findOne({ where: { id: dto.senderId } });
        if (!sender)
            throw new common_1.NotFoundException(`User ${dto.senderId} not found`);
        const msg = this.messages.create({ room, sender, content: dto.content });
        return this.messages.save(msg);
    }
    async findRoomMessages(roomId) {
        await this.findRoom(roomId);
        return this.messages.find({
            where: { room: { id: roomId } },
            relations: { sender: true },
            order: { createdAt: 'ASC' },
        });
    }
    async findMessage(id) {
        const msg = await this.messages.findOne({
            where: { id },
            relations: { sender: true, room: true },
        });
        if (!msg)
            throw new common_1.NotFoundException(`Message ${id} not found`);
        return msg;
    }
    async updateMessage(id, dto) {
        const msg = await this.findMessage(id);
        msg.content = dto.content;
        return this.messages.save(msg);
    }
    async removeMessage(id) {
        const result = await this.messages.delete(id);
        if (!result.affected)
            throw new common_1.NotFoundException(`Message ${id} not found`);
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chat_room_entity_1.ChatRoom)),
    __param(1, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ChatService);
//# sourceMappingURL=chat.service.js.map