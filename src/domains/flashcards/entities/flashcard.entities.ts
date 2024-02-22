import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entities';

@Entity()
export class Flashcard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column({ nullable: true })
  tag: string;

  // lastAnswered: Date nullable
  @Column({ nullable: true })
  lastAnswered: Date;

  // has a category relation
  @ManyToOne(() => Category, (category) => category.flashcards, { eager: true })
  category: Category;

  toJSON() {
    return {
      id: this.id,
      category: this.category.name,
      question: this.question,
      answer: this.answer,
      tag: this.tag,
    };
  }
}
