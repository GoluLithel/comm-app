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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const chat_service_1 = require("./chat.service");
const create_room_dto_1 = require("./dto/create-room.dto");
const update_room_dto_1 = require("./dto/update-room.dto");
const create_message_dto_1 = require("./dto/create-message.dto");
const update_message_dto_1 = require("./dto/update-message.dto");
let ChatController = class ChatController {
    chat;
    constructor(chat) {
        this.chat = chat;
    }
    createRoom(dto) {
        return this.chat.createRoom(dto);
    }
    findAllRooms() {
        return this.chat.findAllRooms();
    }
    findRoom(id) {
        return this.chat.findRoom(id);
    }
    updateRoom(id, dto) {
        return this.chat.updateRoom(id, dto);
    }
    removeRoom(id) {
        return this.chat.removeRoom(id);
    }
    createMessage(roomId, dto) {
        return this.chat.createMessage(roomId, dto);
    }
    listMessages(roomId) {
        return this.chat.findRoomMessages(roomId);
    }
    findMessage(id) {
        return this.chat.findMessage(id);
    }
    updateMessage(id, dto) {
        return this.chat.updateMessage(id, dto);
    }
    removeMessage(id) {
        return this.chat.removeMessage(id);
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Post)('rooms'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_dto_1.CreateRoomDto]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "createRoom", null);
__decorate([
    (0, common_1.Get)('rooms'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "findAllRooms", null);
__decorate([
    (0, common_1.Get)('rooms/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "findRoom", null);
__decorate([
    (0, common_1.Patch)('rooms/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_room_dto_1.UpdateRoomDto]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "updateRoom", null);
__decorate([
    (0, common_1.Delete)('rooms/:id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "removeRoom", null);
__decorate([
    (0, common_1.Post)('rooms/:roomId/messages'),
    __param(0, (0, common_1.Param)('roomId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "createMessage", null);
__decorate([
    (0, common_1.Get)('rooms/:roomId/messages'),
    __param(0, (0, common_1.Param)('roomId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "listMessages", null);
__decorate([
    (0, common_1.Get)('messages/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "findMessage", null);
__decorate([
    (0, common_1.Patch)('messages/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_message_dto_1.UpdateMessageDto]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "updateMessage", null);
__decorate([
    (0, common_1.Delete)('messages/:id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "removeMessage", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map