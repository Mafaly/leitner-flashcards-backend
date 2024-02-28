import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Quiz } from './quiz.entities';
import { Card } from './card.entities';

@Entity()
export class QuizCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.quizCards)
  quiz: Quiz;

  @ManyToOne(() => Card, (card) => card.quizCards)
  card: Card;

  @Column({ default: false })
  answered: boolean;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
