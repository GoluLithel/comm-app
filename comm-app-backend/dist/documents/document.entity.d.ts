import { User } from '../users/user.entity';
import { DocumentShare } from './document-share.entity';
export declare class Document {
    id: string;
    owner: User;
    label: string;
    fileName: string;
    storageKey: string;
    mimeType: string | null;
    sizeBytes: string | null;
    createdAt: Date;
    updatedAt: Date;
    shares: DocumentShare[];
}
