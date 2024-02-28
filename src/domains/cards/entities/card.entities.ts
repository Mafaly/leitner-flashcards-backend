import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../categories/entities/Category';
import { QuizCard } from './quizcard.entities';

@Entity()
export class Card {
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
  @Column({ nullable: true, type: 'timestamp with time zone' })
  lastAnswered: Date;

  @OneToMany(() => QuizCard, (quizCard) => quizCard.card)
  quizCards: QuizCard[];

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
