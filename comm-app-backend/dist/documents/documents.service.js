"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const document_entity_1 = require("./document.entity");
const document_share_entity_1 = require("./document-share.entity");
const user_entity_1 = require("../users/user.entity");
let DocumentsService = class DocumentsService {
    docs;
    shares;
    users;
    constructor(docs, shares, users) {
        this.docs = docs;
        this.shares = shares;
        this.users = users;
    }
    async create(dto) {
        const owner = await this.users.findOne({ where: { id: dto.ownerId } });
        if (!owner)
            throw new common_1.NotFoundException(`Owner ${dto.ownerId} not found`);
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
    findAll(ownerId) {
        return this.docs.find({
            where: ownerId ? { owner: { id: ownerId } } : {},
            relations: { owner: true, shares: { user: true } },
            order: { createdAt: 'DESC' },
        });
    }
    async findSharedWith(userId) {
        const rows = await this.shares.find({
            where: { userId },
            relations: { document: { owner: true } },
            order: { createdAt: 'DESC' },
        });
        return rows.map((r) => r.document);
    }
    async findOne(id) {
        const doc = await this.docs.findOne({
            where: { id },
            relations: { owner: true, shares: { user: true } },
        });
        if (!doc)
            throw new common_1.NotFoundException(`Document ${id} not found`);
        return doc;
    }
    async update(id, dto) {
        const doc = await this.findOne(id);
        Object.assign(doc, dto);
        return this.docs.save(doc);
    }
    async remove(id) {
        const result = await this.docs.delete(id);
        if (!result.affected)
            throw new common_1.NotFoundException(`Document ${id} not found`);
    }
    async addShare(documentId, userId) {
        const doc = await this.docs.findOne({ where: { id: documentId } });
        if (!doc)
            throw new common_1.NotFoundException(`Document ${documentId} not found`);
        const user = await this.users.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException(`User ${userId} not found`);
        const existing = await this.shares.findOne({
            where: { documentId, userId },
        });
        if (existing) {
            throw new common_1.ConflictException(`User ${userId} already has access to document ${documentId}`);
        }
        const share = this.shares.create({ documentId, userId });
        return this.shares.save(share);
    }
    listShares(documentId) {
        return this.shares.find({
            where: { documentId },
            relations: { user: true },
            order: { createdAt: 'ASC' },
        });
    }
    async removeShare(documentId, userId) {
        const result = await this.shares.delete({ documentId, userId });
        if (!result.affected) {
            throw new common_1.NotFoundException(`Share for user ${userId} on document ${documentId} not found`);
        }
    }
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(document_entity_1.Document)),
    __param(1, (0, typeorm_1.InjectRepository)(document_share_entity_1.DocumentShare)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DocumentsService);
//# sourceMappingURL=documents.service.js.map