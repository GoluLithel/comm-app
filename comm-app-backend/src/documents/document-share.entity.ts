import {
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { Document } from './document.entity';
import { User } from '../users/user.entity';

@Entity('document_shares')
export class DocumentShare {
  @PrimaryColumn({ name: 'document_id', type: 'uuid' })
  documentId: string;

  @PrimaryColumn({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => Document, (d) => d.shares, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'document_id' })
  document: Document;

  @ManyToOne(() => User, (u) => u.documentShares, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
