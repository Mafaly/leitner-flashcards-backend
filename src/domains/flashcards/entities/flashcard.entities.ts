import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../categories/entities/Category';

@Entity()
export class Flashcard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Category,
    default: Category.FIRST,
  })
  category: Category;

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column({ nullable: true })
  tag: string;

  // lastAnswered: Date nullable
  @Column({ nullable: true })
  lastAnswered: Date;

  toJSON() {
    return {
      id: this.id,
      category: this.category,
      question: this.question,
      answer: this.answer,
      tag: this.tag,
    };
  }
}
