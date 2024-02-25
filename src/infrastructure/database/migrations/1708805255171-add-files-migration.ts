import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFiles1708805255171 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "files"
                             (
                                 "id"           uuid              NOT NULL DEFAULT uuid_generate_v4(),
                                 "name"         character varying NOT NULL,
                                 "mime_type"    character varying NOT NULL,
                                 "size"         integer           NOT NULL,
                                 "storage_path" character varying NOT NULL,
                                 "created_at"   TIMESTAMP         NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
                                 CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id")
                             )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "files"`);
  }
}
