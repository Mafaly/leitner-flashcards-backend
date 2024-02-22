import { Flashcard } from '../../../domains/flashcards/entities/flashcard.entities';

export interface IFlashcardRepository {
  findFlashcardById(id: string): Promise<Flashcard>;

  findAll(): Promise<Flashcard[]>;
}
