import { Card } from '../entities/card.entities';

export interface IQuizzService {
  getCardsForQuizz(date?: string): Promise<Card[]>;

  answerCard(cardId: string, isValid: boolean): Promise<void>;
}
