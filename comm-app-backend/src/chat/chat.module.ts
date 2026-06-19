import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from './chat-room.entity';
import { Message } from './message.entity';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom, Message]), UsersModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
