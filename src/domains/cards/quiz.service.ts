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
    await this.verifyCanAnserCard(card);
    if (!isValid) {
      card.category = Category.FIRST;
    } else {
      this.moveCardToNextCategory(card);
    }

    const activeQuizSession = await this.quizRepository.findActiveQuiz();
    const currentCardInActiveQuiz = activeQuizSession.quizCards.find(
      (quizCard) => quizCard.card.id == card.id,
    );
    currentCardInActiveQuiz.answered = true;
    card.lastAnswered = new Date();
    await this.quizCardRepository.save(currentCardInActiveQuiz);
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
      throw new NotFoundException('No cards for today');
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

  /**
   * Verify if card can be answered.
   *
   * Is it in an active quiz, is it already answered, is it already done.
   * @param card Card to be verified
   * @private
   *
   * @throws if a condition is not met
   */
  private async verifyCanAnserCard(card: Card): Promise<void> {
    if (card == null) {
      throw new NotFoundException('Card not found');
    }
    if (card.category == Category.DONE) {
      throw new BadRequestException('Card is already done');
    }

    const activeQuizSession = await this.quizRepository.findActiveQuiz();
    if (activeQuizSession == null) {
      throw new BadRequestException('No active quiz');
    }
    const currentCardInActiveQuiz = activeQuizSession.quizCards.find(
      (quizCard) => quizCard.card.id == card.id,
    );
    if (!currentCardInActiveQuiz) {
      throw new BadRequestException('Card is not in active quiz');
    }
    if (currentCardInActiveQuiz.answered) {
      throw new BadRequestException('Card is already answered');
    }

    return;
  }
}
