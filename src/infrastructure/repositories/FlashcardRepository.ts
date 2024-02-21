import { IFlashcardRepository } from './interfaces/IFlashcardRepository';
import { Flashcard } from '../../domains/flashcards/entities/Flashcard';

export class FlashcardRepository implements IFlashcardRepository {
  async findFlashcardById(id: string): Promise<Flashcard> {
    throw new Error('Method not implemented.');
  }

  // Other repository methods here
}
