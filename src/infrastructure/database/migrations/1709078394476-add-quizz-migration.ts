import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddQuiz1709078394476 implements MigrationInterface {
  name = 'AddQuiz1709078394476';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "quiz"
                             (
                                 "id"        uuid                     NOT NULL DEFAULT uuid_generate_v4(),
                                 "startedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                                 CONSTRAINT "PK_422d974e7217414e029b3e641d0" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "quiz_card"
                             (
                                 "id"        uuid                     NOT NULL DEFAULT uuid_generate_v4(),
                                 "answered"  boolean                  NOT NULL DEFAULT false,
                                 "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                                 "quizId"    uuid,
                                 "cardId"    uuid,
                                 CONSTRAINT "PK_5a5ba5b3267b1f279154e3db932" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "card"
        DROP COLUMN "lastAnswered"`);
    await queryRunner.query(`ALTER TABLE "card"
        ADD "lastAnswered" TIMESTAMP WITH TIME ZONE`);
    await queryRunner.query(`ALTER TABLE "quiz_card"
        ADD CONSTRAINT "FK_a6f087bb33b31505383dac89d52" FOREIGN KEY ("quizId") REFERENCES "quiz" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "quiz_card"
        ADD CONSTRAINT "FK_35cb3fe300c3f447ebe61f8a3c0" FOREIGN KEY ("cardId") REFERENCES "card" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "quiz_card"
        DROP CONSTRAINT "FK_35cb3fe300c3f447ebe61f8a3c0"`);
    await queryRunner.query(`ALTER TABLE "quiz_card"
        DROP CONSTRAINT "FK_a6f087bb33b31505383dac89d52"`);
    await queryRunner.query(`ALTER TABLE "card"
        DROP COLUMN "lastAnswered"`);
    await queryRunner.query(`ALTER TABLE "card"
        ADD "lastAnswered" TIMESTAMP`);
    await queryRunner.query(`DROP TABLE "quiz_card"`);
    await queryRunner.query(`DROP TABLE "quiz"`);
  }
}
