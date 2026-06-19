import { MigrationInterface, QueryRunner } from 'typeorm';
import { randomUUID } from 'crypto';

export class SeedInitialData1700000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const ids = {
      textUser: randomUUID(),
      anne: randomUUID(),
      jale: randomUUID(),
      jack: randomUUID(),
      hr: randomUUID(),
      room: randomUUID(),
      doc1: randomUUID(),
      doc2: randomUUID(),
      doc3: randomUUID(),
      doc4: randomUUID(),
      doc5: randomUUID(),
    };

    // ---------- users ----------
    await queryRunner.query(
      `INSERT INTO "users" ("id", "name", "email", "password") VALUES
        ($1, 'Text User',   'textuser@gmail.com',    'password'),
        ($2, 'Anne Hunter', 'anne.hunter@mail.com',  'password'),
        ($3, 'Jale Boser',  'jale@yahoo.com',        'password'),
        ($4, 'Jack Washk',  'jack@washk.com',        'password'),
        ($5, 'HR',          'hr@office.com',         'password')`,
      [ids.textUser, ids.anne, ids.jale, ids.jack, ids.hr],
    );

    // ---------- chat room ----------
    await queryRunner.query(
      `INSERT INTO "chat_rooms" ("id", "name", "type") VALUES ($1, 'General', 'group')`,
      [ids.room],
    );

    // ---------- messages ----------
    // created_at is offset so they sort in the original order
    await queryRunner.query(
      `INSERT INTO "messages" ("room_id", "sender_id", "content", "created_at") VALUES
        ($1, $2, 'Morning all! Did the Q2 deck get finalized?',          now() - interval '12 minutes'),
        ($1, $2, 'Also pushed the latest numbers to the shared folder.', now() - interval '9 minutes'),
        ($1, $3, 'Thanks — reviewing now. Looks solid to me.',           now() - interval '3 minutes'),
        ($1, $4, 'I''ll add the regional breakdown before noon.',        now())`,
      [ids.room, ids.textUser, ids.anne, ids.jack],
    );

    // ---------- documents owned by Anne (was SEED_MY_UPLOADS) ----------
    await queryRunner.query(
      `INSERT INTO "documents" ("id", "owner_id", "label", "file_name", "storage_key") VALUES
        ($1, $4, 'Sales Report',       'sales-May2026.xlsx',   'seed/sales-May2026.xlsx'),
        ($2, $4, 'Quarterly Summary',  'SummaryQ2-2026.pptx',  'seed/SummaryQ2-2026.pptx'),
        ($3, $4, 'Projection 2025-26', 'SalesProjection.xlsx', 'seed/SalesProjection.xlsx')`,
      [ids.doc1, ids.doc2, ids.doc3, ids.anne],
    );

    // shares for "Sales Report" — preserves the seed (Anne + Text User)
    await queryRunner.query(
      `INSERT INTO "document_shares" ("document_id", "user_id") VALUES
        ($1, $2),
        ($1, $3)`,
      [ids.doc1, ids.anne, ids.textUser],
    );

    // ---------- documents shared with Anne (was SEED_SHARED) ----------
    // "Team Attendance — May" by anne.hunter@mail.com → Anne owns it, shared with Anne
    // "Office Rules"          by hr@office.com       → HR owns it, shared with Anne
    await queryRunner.query(
      `INSERT INTO "documents" ("id", "owner_id", "label", "file_name", "storage_key") VALUES
        ($1, $3, 'Team Attendance — May', 'Attendance-May2026.xlsx', 'seed/Attendance-May2026.xlsx'),
        ($2, $4, 'Office Rules',          'OfficeRules.docx',        'seed/OfficeRules.docx')`,
      [ids.doc4, ids.doc5, ids.anne, ids.hr],
    );

    await queryRunner.query(
      `INSERT INTO "document_shares" ("document_id", "user_id") VALUES
        ($1, $3),
        ($2, $3)`,
      [ids.doc4, ids.doc5, ids.anne],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // CASCADE handles messages, documents, document_shares.
    await queryRunner.query(
      `DELETE FROM "users" WHERE "email" IN
        ('textuser@gmail.com','anne.hunter@mail.com','jale@yahoo.com','jack@washk.com','hr@office.com')`,
    );
    await queryRunner.query(`DELETE FROM "chat_rooms" WHERE "name" = 'General'`);
  }
}
