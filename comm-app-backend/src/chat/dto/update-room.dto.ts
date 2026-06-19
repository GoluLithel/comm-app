import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateRoomDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @IsOptional()
  @IsIn(['group', 'dm'])
  type?: 'group' | 'dm';
}
