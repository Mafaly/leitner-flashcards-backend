import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IQuizzService } from './interfaces/IQuizzService';
import { Card } from './entities/card.entities';
import { CardRepository } from '../../infrastructure/repositories/CardRepository';
import { Category } from '../categories/entities/Category';
import { QuizRepository } from '../../infrastructure/repositories/QuizRepository';
import { QuizCardRepository } from '../../infrastructure/repositories/QuizCardRepository';

@Injectable()
export class QuizService implements IQuizzService {
  constructor(
    private cardRepository: CardRepository,
    private quizRepository: QuizRepository,
    private quizCardRepository: QuizCardRepository,
  ) {}

  async answerCard(cardId: string, isValid: boolean): Promise<void> {
    if (cardId == '') throw new BadRequestException('Card id is required');
    const card = await this.cardRepository.findCardById(cardId);
    if (card == null) {
      throw new NotFoundException('Card not found');
    }
    if (!isValid) {
      card.category = Category.FIRST;
    } else {
      card.lastAnswered = new Date();
      this.moveCardToNextCategory(card);
    }

    await this.cardRepository.save(card);

    return;
  }

  async getCardsForQuizz(): Promise<Card[]> {
    const quizCards = await this.quizRepository.findTodaysQuiz();
    if (quizCards && quizCards.length > 0) {
      return quizCards;
    }
    const cards = await this.cardRepository.findCardsForReview();
    if (cards.length <= 0) {
      return null;
    }
    await this.createQuiz(cards);
    return cards;
  }

  private moveCardToNextCategory(card: Card) {
    switch (card.category) {
      case Category.FIRST:
        card.category = Category.SECOND;
        break;
      case Category.SECOND:
        card.category = Category.THIRD;
        break;
      case Category.THIRD:
        card.category = Category.FOURTH;
        break;
      case Category.FOURTH:
        card.category = Category.FIFTH;
        break;
      case Category.FIFTH:
        card.category = Category.SIXTH;
        break;
      case Category.SIXTH:
        card.category = Category.SEVENTH;
        break;
      case Category.SEVENTH:
        card.category = Category.DONE;
        break;
      case Category.DONE:
      default:
        throw new BadRequestException('Card is already done');
    }
  }

  private async createQuiz(cards: Card[]): Promise<void> {
    const quiz = this.quizRepository.create();
    await this.quizRepository.save(quiz);
    cards.forEach((card) => {
      const quizCard = this.quizCardRepository.create();
      quizCard.card = card;
      quizCard.quiz = quiz;
      this.quizCardRepository.save(quizCard);
    });
  }
}
