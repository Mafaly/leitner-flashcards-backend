import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialDB1708566832193 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."category_name_enum" AS ENUM('FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH', 'DONE')`,
    );
    await queryRunner.query(`CREATE TABLE "category"
                             (
                                 "id"    uuid                          NOT NULL DEFAULT uuid_generate_v4(),
                                 "name"  "public"."category_name_enum" NOT NULL DEFAULT 'FIRST',
                                 "order" integer,
                                 CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "flashcard"
                             (
                                 "id"           uuid              NOT NULL DEFAULT uuid_generate_v4(),
                                 "question"     character varying NOT NULL,
                                 "answer"       character varying NOT NULL,
                                 "tag"          character varying,
                                 "lastAnswered" TIMESTAMP,
                                 "categoryId"   uuid,
                                 CONSTRAINT "PK_e0aba0501d3bc532951efc9f791" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "flashcard"
        ADD CONSTRAINT "FK_c17e88ef31fafce40676f4395cd" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "flashcard"
        DROP CONSTRAINT "FK_c17e88ef31fafce40676f4395cd"`);
    await queryRunner.query(`DROP TABLE "flashcard"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TYPE "public"."category_name_enum"`);
  }
}
