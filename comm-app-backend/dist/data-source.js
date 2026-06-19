"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./users/user.entity");
const chat_room_entity_1 = require("./chat/chat-room.entity");
const message_entity_1 = require("./chat/message.entity");
const document_entity_1 = require("./documents/document.entity");
const document_share_entity_1 = require("./documents/document-share.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USER ?? 'commapp',
    password: process.env.DB_PASSWORD ?? 'commapp',
    database: process.env.DB_NAME ?? 'commapp',
    entities: [user_entity_1.User, chat_room_entity_1.ChatRoom, message_entity_1.Message, document_entity_1.Document, document_share_entity_1.DocumentShare],
    migrations: [__dirname + '/migrations/*.{ts,js}'],
    synchronize: false,
});
//# sourceMappingURL=data-source.js.map