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
exports.DocumentShare = void 0;
const typeorm_1 = require("typeorm");
const document_entity_1 = require("./document.entity");
const user_entity_1 = require("../users/user.entity");
let DocumentShare = class DocumentShare {
    documentId;
    userId;
    document;
    user;
    createdAt;
};
exports.DocumentShare = DocumentShare;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'document_id', type: 'uuid' }),
    __metadata("design:type", String)
], DocumentShare.prototype, "documentId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'user_id', type: 'uuid' }),
    __metadata("design:type", String)
], DocumentShare.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_entity_1.Document, (d) => d.shares, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'document_id' }),
    __metadata("design:type", document_entity_1.Document)
], DocumentShare.prototype, "document", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (u) => u.documentShares, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], DocumentShare.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], DocumentShare.prototype, "createdAt", void 0);
exports.DocumentShare = DocumentShare = __decorate([
    (0, typeorm_1.Entity)('document_shares')
], DocumentShare);
//# sourceMappingURL=document-share.entity.js.map