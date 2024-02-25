import { CardId } from '../dtos/CardIdDto';
import { Card } from '../entities/card.entities';

export interface IQuizzService {
  getCardsForQuizz(date?: string): Promise<Card[]>;

  answerCard(cardId: CardId, isValid: boolean): Promise<void>;
}
