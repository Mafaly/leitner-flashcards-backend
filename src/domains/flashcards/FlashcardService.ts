import { IFlashcardService } from './interfaces/IFlashcardService';
import { Flashcard } from './entities/Flashcard';

export class FlashcardService implements IFlashcardService {
  getFlashcardById(flashcardId: string): Promise<Flashcard> {
    return Promise.resolve(undefined);
  }

  getFlashcards(): Promise<Flashcard[]> {
    return Promise.resolve([]);
  }
}
