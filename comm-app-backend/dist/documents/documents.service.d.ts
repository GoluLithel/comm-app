import { Repository } from 'typeorm';
import { Document } from './document.entity';
import { DocumentShare } from './document-share.entity';
import { User } from '../users/user.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
export declare class DocumentsService {
    private readonly docs;
    private readonly shares;
    private readonly users;
    constructor(docs: Repository<Document>, shares: Repository<DocumentShare>, users: Repository<User>);
    create(dto: CreateDocumentDto): Promise<Document>;
    findAll(ownerId?: string): Promise<Document[]>;
    findSharedWith(userId: string): Promise<Document[]>;
    findOne(id: string): Promise<Document>;
    update(id: string, dto: UpdateDocumentDto): Promise<Document>;
    remove(id: string): Promise<void>;
    addShare(documentId: string, userId: string): Promise<DocumentShare>;
    listShares(documentId: string): Promise<DocumentShare[]>;
    removeShare(documentId: string, userId: string): Promise<void>;
}
