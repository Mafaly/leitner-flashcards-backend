import { Flashcard } from '../entities/flashcard.entities';

export interface IQuizzService {
  getCardsForQuizz(date?: string): Promise<Flashcard[]>;

  answerCard(cardId: string, isValid: boolean): Promise<void>;
}
