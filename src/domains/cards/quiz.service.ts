import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IQuizzService } from './interfaces/IQuizzService';
import { Card } from './entities/card.entities';
import { CardRepository } from '../../infrastructure/repositories/CardRepository';
import { Category } from '../categories/entities/Category';

@Injectable()
export class QuizService implements IQuizzService {
  constructor(private cardRepository: CardRepository) {}

  async answerCard(cardId: string, isValid: boolean): Promise<void> {
    if (cardId == '') throw new BadRequestException('Card id is required');
    const card = await this.cardRepository.findCardById(cardId);
    if (card == null) {
      throw new NotFoundException('Card not found');
    }
    if (!isValid) {
      card.category = Category.FIRST;
    } else {
      this.moveCardToNextCategory(card);
    }

    await this.cardRepository.save(card);

    return;
  }

  getCardsForQuizz(): Promise<Card[]> {
    return Promise.resolve([]);
  }

  moveCardToNextCategory(card: Card) {
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
}
