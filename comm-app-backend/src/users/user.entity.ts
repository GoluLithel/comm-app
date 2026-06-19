import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Message } from '../chat/message.entity';
import { Document } from '../documents/document.entity';
import { DocumentShare } from '../documents/document-share.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 120 })
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => Message, (m) => m.sender)
  messages!: Message[];

  @OneToMany(() => Document, (d) => d.owner)
  documents!: Document[];

  @OneToMany(() => DocumentShare, (s) => s.user)
  documentShares!: DocumentShare[];
}
