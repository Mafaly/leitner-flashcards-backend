import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1708812601222 implements MigrationInterface {
  name = 'Migration1708812601222';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."card_category_enum" AS ENUM('FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH', 'DONE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "card"
       (
           "id"           uuid                          NOT NULL DEFAULT uuid_generate_v4(),
           "category"     "public"."card_category_enum" NOT NULL DEFAULT 'FIRST',
           "question"     character varying             NOT NULL,
           "answer"       character varying             NOT NULL,
           "tag"          character varying,
           "lastAnswered" TIMESTAMP,
           CONSTRAINT "PK_e0aba0501d3bc532951efc9f791" PRIMARY KEY ("id")
       )`,
    );
    await queryRunner.query(
      `INSERT INTO card (category, question, answer, tag, "lastAnswered")
       VALUES ('FIRST', 'What is the capital of France?', 'Paris', 'geography', '2021-01-01');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "card"`);
    await queryRunner.query(`DROP TYPE "public"."card_category_enum"`);
  }
}
