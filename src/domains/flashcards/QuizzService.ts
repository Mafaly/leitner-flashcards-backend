import { IQuizzService } from './interfaces/IQuizzService';
import { Flashcard } from './entities/flashcard.entities';
import { Injectable } from '@nestjs/common';
import { CardId } from './dtos/CardIdDto';

@Injectable()
export class QuizzService implements IQuizzService {
  getCardsForQuizz(date?: string): Promise<Flashcard[]> {
    return Promise.resolve([]);
  }

  answerCard(cardId: CardId, isValid: boolean): Promise<void> {
    return Promise.resolve(undefined);
  }
}
