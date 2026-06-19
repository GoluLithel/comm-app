import { Document } from './document.entity';
import { User } from '../users/user.entity';
export declare class DocumentShare {
    documentId: string;
    userId: string;
    document: Document;
    user: User;
    createdAt: Date;
}
