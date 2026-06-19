import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateMessageDto {
  @IsUUID()
  senderId!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;
}
