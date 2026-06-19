import { Message } from '../chat/message.entity';
import { Document } from '../documents/document.entity';
import { DocumentShare } from '../documents/document-share.entity';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    messages: Message[];
    documents: Document[];
    documentShares: DocumentShare[];
}
