import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCategories1708566928941 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO category (name, "order")
       VALUES ('FIRST', 1),
              ('SECOND', 2),
              ('THIRD', 3),
              ('FOURTH', 4),
              ('FIFTH', 5),
              ('SIXTH', 6),
              ('SEVENTH', 7),
              ('DONE', 8)`,
    );

    await queryRunner.query(
      `INSERT INTO flashcard (question, answer, tag, "lastAnswered", "categoryId")
       VALUES ('What is the capital of France?', 'Paris', 'geography', '2021-01-01', (SELECT id FROM category WHERE name = 'FIRST'));`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE
                             FROM category`);
  }
}
