import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { User } from './users/user.entity';
import { ChatRoom } from './chat/chat-room.entity';
import { Message } from './chat/message.entity';
import { Document } from './documents/document.entity';
import { DocumentShare } from './documents/document-share.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USER ?? 'commapp',
  password: process.env.DB_PASSWORD ?? 'commapp',
  database: process.env.DB_NAME ?? 'commapp',
  entities: [User, ChatRoom, Message, Document, DocumentShare],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: false,
});
