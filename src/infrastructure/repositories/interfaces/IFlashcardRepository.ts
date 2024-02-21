import { Flashcard } from '../../../domains/flashcards/entities/Flashcard';

export interface IFlashcardRepository {
  findFlashcardById(id: string): Promise<Flashcard>;
}
