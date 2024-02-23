import { IQuizzService } from './interfaces/IQuizzService';
import { Flashcard } from './entities/flashcard.entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizzService implements IQuizzService {
  getCardsForQuizz(date?: string): Promise<Flashcard[]> {
    return Promise.resolve([]);
  }

  answerCard(cardId: string, isValid: boolean): Promise<void> {
    return Promise.resolve(undefined);
  }
}
