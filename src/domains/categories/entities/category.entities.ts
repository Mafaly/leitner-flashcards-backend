import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Flashcard } from '../../flashcards/entities/flashcard.entities';
import { CategoryName } from '../interfaces/CategoryName.interface';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: CategoryName,
    default: CategoryName.FIRST,
  })
  name: CategoryName;

  @Column({ nullable: true })
  order?: number;

  // has a flashcards relation
  @OneToMany(() => Flashcard, (flashcard) => flashcard.category, {
    eager: false,
  })
  flashcards: Flashcard[];
}
