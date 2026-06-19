import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { ShareDocumentDto } from './dto/share-document.dto';
export declare class DocumentsController {
    private readonly docs;
    constructor(docs: DocumentsService);
    create(dto: CreateDocumentDto): Promise<import("./document.entity").Document>;
    findAll(ownerId?: string): Promise<import("./document.entity").Document[]>;
    sharedWith(userId: string): Promise<import("./document.entity").Document[]>;
    findOne(id: string): Promise<import("./document.entity").Document>;
    update(id: string, dto: UpdateDocumentDto): Promise<import("./document.entity").Document>;
    remove(id: string): Promise<void>;
    listShares(id: string): Promise<import("./document-share.entity").DocumentShare[]>;
    addShare(id: string, dto: ShareDocumentDto): Promise<import("./document-share.entity").DocumentShare>;
    removeShare(id: string, userId: string): Promise<void>;
}
