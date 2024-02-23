import { Flashcard } from '../entities/flashcard.entities';

export interface IFlashcardService {
  getAllCards(tags?: string[]): Promise<Flashcard[]>;

  createCard(cardUserData: CardUserData): Promise<Flashcard>;
}
