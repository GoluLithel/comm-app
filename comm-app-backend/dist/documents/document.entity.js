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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const document_share_entity_1 = require("./document-share.entity");
let Document = class Document {
    id;
    owner;
    label;
    fileName;
    storageKey;
    mimeType;
    sizeBytes;
    createdAt;
    updatedAt;
    shares;
};
exports.Document = Document;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Document.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (u) => u.documents, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'owner_id' }),
    __metadata("design:type", user_entity_1.User)
], Document.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Document.prototype, "label", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_name', length: 255 }),
    __metadata("design:type", String)
], Document.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'storage_key', type: 'text' }),
    __metadata("design:type", String)
], Document.prototype, "storageKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mime_type', type: 'varchar', length: 120, nullable: true }),
    __metadata("design:type", Object)
], Document.prototype, "mimeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'size_bytes', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], Document.prototype, "sizeBytes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Document.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Document.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_share_entity_1.DocumentShare, (s) => s.document, { cascade: true }),
    __metadata("design:type", Array)
], Document.prototype, "shares", void 0);
exports.Document = Document = __decorate([
    (0, typeorm_1.Entity)('documents')
], Document);
//# sourceMappingURL=document.entity.js.map