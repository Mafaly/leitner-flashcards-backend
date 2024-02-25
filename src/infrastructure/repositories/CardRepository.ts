import { ICardRepository } from './interfaces/ICardRepository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from '../../domains/cards/entities/card.entities';

export class CardRepository
  extends Repository<Card>
  implements ICardRepository
{
  constructor(
    @InjectRepository(Card)
    private readonly flashcardRepository: Repository<Card>,
  ) {
    super(
      flashcardRepository.target,
      flashcardRepository.manager,
      flashcardRepository.queryRunner,
    );
  }

  findCardById(id: string): Promise<Card> {
    return this.findOneBy({ id });
  }

  findAll(): Promise<Card[]> {
    return this.find();
  }
}
