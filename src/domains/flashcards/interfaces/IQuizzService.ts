import { Flashcard } from '../entities/flashcard.entities';
import { CardId } from '../dtos/CardIdDto';

export interface IQuizzService {
  getCardsForQuizz(date?: string): Promise<Flashcard[]>;

  answerCard(cardId: CardId, isValid: boolean): Promise<void>;
}
