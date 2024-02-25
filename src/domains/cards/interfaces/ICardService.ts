import { CardUserData } from '../dtos/CardUserDataDto';
import { Card } from '../entities/card.entities';

export interface ICardService {
  getAllCards(tags?: string[]): Promise<Card[]>;

  createCard(cardUserData: CardUserData): Promise<Card>;
}
