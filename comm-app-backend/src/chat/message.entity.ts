import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../users/user.entity';
import { ChatRoom } from './chat-room.entity';

@Entity('messages')
@Index(['room', 'createdAt'])
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => ChatRoom, (r) => r.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'room_id' })
  room!: ChatRoom;

  @ManyToOne(() => User, (u) => u.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sender_id' })
  sender!: User;

  @Column({ type: 'text' })
  content!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
