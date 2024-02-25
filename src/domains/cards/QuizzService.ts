import { IQuizzService } from './interfaces/IQuizzService';
import { Injectable } from '@nestjs/common';
import { CardId } from './dtos/CardIdDto';
import { CardRepository } from '../../infrastructure/repositories/CardRepository';
import { Card } from './entities/card.entities';

@Injectable()
export class QuizzService implements IQuizzService {
  constructor(private readonly flashcardRepository: CardRepository) {}

  async getCardsForQuizz(date?: string): Promise<Card[]> {
    // TODO récupérer les cartes selon la logique voulue pour le quizz.
    const queryBuilder =
      this.flashcardRepository.createQueryBuilder('flashcard');

    if (date) {
      queryBuilder.where('flashcard.lastAnswered < :date', { date });
    }
    return queryBuilder.getMany();
  }

  async answerCard(cardId: CardId, isValid: boolean): Promise<void> {
    //TODO handle is isValid or not
    //TODO return 204 and not 200 http code
    const flashcard = await this.flashcardRepository.findCardById(
      cardId.cardId,
    );

    if (!flashcard) {
      throw new Error('Flashcard not found');
    }
    if (isValid || !isValid) {
    }

    flashcard.lastAnswered = new Date();
    await this.flashcardRepository.save(flashcard);
  }
}
