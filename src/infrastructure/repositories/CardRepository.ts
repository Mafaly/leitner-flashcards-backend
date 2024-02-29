import { ICardRepository } from './interfaces/ICardRepository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from '../../domains/cards/entities/card.entities';
import { Injectable } from '@nestjs/common';
import {
  Category,
  categoryDaysMap,
} from '../../domains/categories/entities/Category';
import { addDays } from 'date-fns/addDays';
import { isAfter } from 'date-fns/isAfter';
import { startOfDay } from 'date-fns';

@Injectable()
export class CardRepository
  extends Repository<Card>
  implements ICardRepository
{
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {
    super(
      cardRepository.target,
      cardRepository.manager,
      cardRepository.queryRunner,
    );
  }

  findCardById(id: string): Promise<Card> {
    return this.findOneBy({ id });
  }

  findAll(): Promise<Card[]> {
    return this.find();
  }

  /**
   * Find all cards that are ready for review.
   */
  async findCardsForReview(): Promise<Card[]> {
    const today = startOfDay(new Date());
    const cards = await this.cardRepository.find();

    return cards.filter((card) => {
      if (card.category === Category.FIRST || card.lastAnswered === null) {
        return true;
      }
      const daysToAdd = categoryDaysMap[card.category];
      const nextReviewDate = addDays(card.lastAnswered, daysToAdd);
      const nextReviewDateStart = startOfDay(nextReviewDate);
      return (
        isAfter(today, nextReviewDateStart) ||
        today.getTime() === nextReviewDateStart.getTime()
      );
    });
  }
}
