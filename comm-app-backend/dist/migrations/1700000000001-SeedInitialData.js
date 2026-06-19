"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedInitialData1700000000001 = void 0;
const crypto_1 = require("crypto");
class SeedInitialData1700000000001 {
    async up(queryRunner) {
        const ids = {
            textUser: (0, crypto_1.randomUUID)(),
            anne: (0, crypto_1.randomUUID)(),
            jale: (0, crypto_1.randomUUID)(),
            jack: (0, crypto_1.randomUUID)(),
            hr: (0, crypto_1.randomUUID)(),
            room: (0, crypto_1.randomUUID)(),
            doc1: (0, crypto_1.randomUUID)(),
            doc2: (0, crypto_1.randomUUID)(),
            doc3: (0, crypto_1.randomUUID)(),
            doc4: (0, crypto_1.randomUUID)(),
            doc5: (0, crypto_1.randomUUID)(),
        };
        await queryRunner.query(`INSERT INTO "users" ("id", "name", "email", "password") VALUES
        ($1, 'Text User',   'textuser@gmail.com',    'password'),
        ($2, 'Anne Hunter', 'anne.hunter@mail.com',  'password'),
        ($3, 'Jale Boser',  'jale@yahoo.com',        'password'),
        ($4, 'Jack Washk',  'jack@washk.com',        'password'),
        ($5, 'HR',          'hr@office.com',         'password')`, [ids.textUser, ids.anne, ids.jale, ids.jack, ids.hr]);
        await queryRunner.query(`INSERT INTO "chat_rooms" ("id", "name", "type") VALUES ($1, 'General', 'group')`, [ids.room]);
        await queryRunner.query(`INSERT INTO "messages" ("room_id", "sender_id", "content", "created_at") VALUES
        ($1, $2, 'Morning all! Did the Q2 deck get finalized?',          now() - interval '12 minutes'),
        ($1, $2, 'Also pushed the latest numbers to the shared folder.', now() - interval '9 minutes'),
        ($1, $3, 'Thanks — reviewing now. Looks solid to me.',           now() - interval '3 minutes'),
        ($1, $4, 'I''ll add the regional breakdown before noon.',        now())`, [ids.room, ids.textUser, ids.anne, ids.jack]);
        await queryRunner.query(`INSERT INTO "documents" ("id", "owner_id", "label", "file_name", "storage_key") VALUES
        ($1, $4, 'Sales Report',       'sales-May2026.xlsx',   'seed/sales-May2026.xlsx'),
        ($2, $4, 'Quarterly Summary',  'SummaryQ2-2026.pptx',  'seed/SummaryQ2-2026.pptx'),
        ($3, $4, 'Projection 2025-26', 'SalesProjection.xlsx', 'seed/SalesProjection.xlsx')`, [ids.doc1, ids.doc2, ids.doc3, ids.anne]);
        await queryRunner.query(`INSERT INTO "document_shares" ("document_id", "user_id") VALUES
        ($1, $2),
        ($1, $3)`, [ids.doc1, ids.anne, ids.textUser]);
        await queryRunner.query(`INSERT INTO "documents" ("id", "owner_id", "label", "file_name", "storage_key") VALUES
        ($1, $3, 'Team Attendance — May', 'Attendance-May2026.xlsx', 'seed/Attendance-May2026.xlsx'),
        ($2, $4, 'Office Rules',          'OfficeRules.docx',        'seed/OfficeRules.docx')`, [ids.doc4, ids.doc5, ids.anne, ids.hr]);
        await queryRunner.query(`INSERT INTO "document_shares" ("document_id", "user_id") VALUES
        ($1, $3),
        ($2, $3)`, [ids.doc4, ids.doc5, ids.anne]);
    }
    async down(queryRunner) {
        await queryRunner.query(`DELETE FROM "users" WHERE "email" IN
        ('textuser@gmail.com','anne.hunter@mail.com','jale@yahoo.com','jack@washk.com','hr@office.com')`);
        await queryRunner.query(`DELETE FROM "chat_rooms" WHERE "name" = 'General'`);
    }
}
exports.SeedInitialData1700000000001 = SeedInitialData1700000000001;
//# sourceMappingURL=1700000000001-SeedInitialData.js.map