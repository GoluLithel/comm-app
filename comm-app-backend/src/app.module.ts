import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { DocumentsModule } from './documents/documents.module';
import { AuthModule } from './auth/auth.module';

import { User } from './users/user.entity';
import { ChatRoom } from './chat/chat-room.entity';
import { Message } from './chat/message.entity';
import { Document } from './documents/document.entity';
import { DocumentShare } from './documents/document-share.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: parseInt(config.get<string>('DB_PORT', '5432'), 10),
        username: config.get<string>('DB_USER', 'commapp'),
        password: config.get<string>('DB_PASSWORD', 'commapp'),
        database: config.get<string>('DB_NAME', 'commapp'),
        entities: [User, ChatRoom, Message, Document, DocumentShare],
        migrations: [__dirname + '/migrations/*.{ts,js}'],
        migrationsRun: true,
        synchronize: false,
      }),
    }),
    UsersModule,
    ChatModule,
    DocumentsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
