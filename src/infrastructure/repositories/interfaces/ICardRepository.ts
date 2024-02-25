import { Card } from '../../../domains/cards/entities/card.entities';

export interface ICardRepository {
  findCardById(id: string): Promise<Card>;

  findAll(): Promise<Card[]>;
}
