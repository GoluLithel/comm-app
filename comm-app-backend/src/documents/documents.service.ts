import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';
import { DocumentShare } from './document-share.entity';
import { User } from '../users/user.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly docs: Repository<Document>,
    @InjectRepository(DocumentShare)
    private readonly shares: Repository<DocumentShare>,
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  // ---------- documents ----------
  async create(dto: CreateDocumentDto): Promise<Document> {
    const owner = await this.users.findOne({ where: { id: dto.ownerId } });
    if (!owner) throw new NotFoundException(`Owner ${dto.ownerId} not found`);
    const doc = this.docs.create({
      owner,
      label: dto.label,
      fileName: dto.fileName,
      storageKey: dto.storageKey,
      mimeType: dto.mimeType ?? null,
      sizeBytes: dto.sizeBytes ?? null,
    });
    return this.docs.save(doc);
  }

  findAll(ownerId?: string): Promise<Document[]> {
    return this.docs.find({
      where: ownerId ? { owner: { id: ownerId } } : {},
      relations: { owner: true, shares: { user: true } },
      order: { createdAt: 'DESC' },
    });
  }

  async findSharedWith(userId: string): Promise<Document[]> {
    const rows = await this.shares.find({
      where: { userId },
      relations: { document: { owner: true } },
      order: { createdAt: 'DESC' },
    });
    return rows.map((r) => r.document);
  }

  async findOne(id: string): Promise<Document> {
    const doc = await this.docs.findOne({
      where: { id },
      relations: { owner: true, shares: { user: true } },
    });
    if (!doc) throw new NotFoundException(`Document ${id} not found`);
    return doc;
  }

  async update(id: string, dto: UpdateDocumentDto): Promise<Document> {
    const doc = await this.findOne(id);
    Object.assign(doc, dto);
    return this.docs.save(doc);
  }

  async remove(id: string): Promise<void> {
    const result = await this.docs.delete(id);
    if (!result.affected) throw new NotFoundException(`Document ${id} not found`);
  }

  // ---------- shares ----------
  async addShare(documentId: string, userId: string): Promise<DocumentShare> {
    const doc = await this.docs.findOne({ where: { id: documentId } });
    if (!doc) throw new NotFoundException(`Document ${documentId} not found`);
    const user = await this.users.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User ${userId} not found`);
    const existing = await this.shares.findOne({
      where: { documentId, userId },
    });
    if (existing) {
      throw new ConflictException(
        `User ${userId} already has access to document ${documentId}`,
      );
    }
    const share = this.shares.create({ documentId, userId });
    return this.shares.save(share);
  }

  listShares(documentId: string): Promise<DocumentShare[]> {
    return this.shares.find({
      where: { documentId },
      relations: { user: true },
      order: { createdAt: 'ASC' },
    });
  }

  async removeShare(documentId: string, userId: string): Promise<void> {
    const result = await this.shares.delete({ documentId, userId });
    if (!result.affected) {
      throw new NotFoundException(
        `Share for user ${userId} on document ${documentId} not found`,
      );
    }
  }
}
