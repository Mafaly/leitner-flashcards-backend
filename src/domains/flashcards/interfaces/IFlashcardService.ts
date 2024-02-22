import { Flashcard } from '../entities/flashcard.entities';

export interface IFlashcardService {
  getFlashcards(): Promise<Flashcard[]>;

  getFlashcardById(flashcardId: string): Promise<Flashcard>;
}
