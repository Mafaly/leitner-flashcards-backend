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

  async findCardsForReview(): Promise<Card[]> {
    const today = startOfDay(new Date());
    const cards = await this.cardRepository.find();

    return cards.filter((card) => {
      if (card.category === Category.FIRST || card.lastAnswered === null) {
        return true;
      }
      const daysToAdd = categoryDaysMap[card.category]; // Assurez-vous que categoryDaysMap est bien défini et importé
      const nextReviewDate = addDays(card.lastAnswered, daysToAdd);
      return (
        isAfter(today, nextReviewDate) ||
        today.getTime() === nextReviewDate.getTime()
      );
    });
  }
}
