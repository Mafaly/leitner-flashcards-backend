import { Flashcard } from '../entities/flashcard.entities';
import { CardUserData } from '../dtos/CardUserDataDto';

export interface IFlashcardService {
  getAllCards(tags?: string[]): Promise<Flashcard[]>;

  createCard(cardUserData: CardUserData): Promise<Flashcard>;
}
