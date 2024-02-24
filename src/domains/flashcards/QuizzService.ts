import { IQuizzService } from './interfaces/IQuizzService';
import { Flashcard } from './entities/flashcard.entities';
import { Injectable } from '@nestjs/common';
import { CardId } from './dtos/CardIdDto';
import { FlashcardRepository } from '../../infrastructure/repositories/FlashcardRepository';

@Injectable()
export class QuizzService implements IQuizzService {
  constructor(private readonly flashcardRepository: FlashcardRepository) {}

  async getCardsForQuizz(date?: string): Promise<Flashcard[]> {
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
    const flashcard = await this.flashcardRepository.findFlashcardById(
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
