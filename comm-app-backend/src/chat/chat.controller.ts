import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller()
export class ChatController {
  constructor(private readonly chat: ChatService) {}

  // ---------- rooms ----------
  @Post('rooms')
  createRoom(@Body() dto: CreateRoomDto) {
    return this.chat.createRoom(dto);
  }

  @Get('rooms')
  findAllRooms() {
    return this.chat.findAllRooms();
  }

  @Get('rooms/:id')
  findRoom(@Param('id', ParseUUIDPipe) id: string) {
    return this.chat.findRoom(id);
  }

  @Patch('rooms/:id')
  updateRoom(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateRoomDto,
  ) {
    return this.chat.updateRoom(id, dto);
  }

  @Delete('rooms/:id')
  @HttpCode(204)
  removeRoom(@Param('id', ParseUUIDPipe) id: string) {
    return this.chat.removeRoom(id);
  }

  // ---------- messages ----------
  @Post('rooms/:roomId/messages')
  createMessage(
    @Param('roomId', ParseUUIDPipe) roomId: string,
    @Body() dto: CreateMessageDto,
  ) {
    return this.chat.createMessage(roomId, dto);
  }

  @Get('rooms/:roomId/messages')
  listMessages(@Param('roomId', ParseUUIDPipe) roomId: string) {
    return this.chat.findRoomMessages(roomId);
  }

  @Get('messages/:id')
  findMessage(@Param('id', ParseUUIDPipe) id: string) {
    return this.chat.findMessage(id);
  }

  @Patch('messages/:id')
  updateMessage(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateMessageDto,
  ) {
    return this.chat.updateMessage(id, dto);
  }

  @Delete('messages/:id')
  @HttpCode(204)
  removeMessage(@Param('id', ParseUUIDPipe) id: string) {
    return this.chat.removeMessage(id);
  }
}
