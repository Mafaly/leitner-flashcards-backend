import { Flashcard } from '../entities/Flashcard';

export interface IFlashcardService {
  getFlashcards(): Promise<Flashcard[]>;
  getFlashcardById(flashcardId: string): Promise<Flashcard>;
}
