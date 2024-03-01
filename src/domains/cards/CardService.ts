import { ICardService } from './interfaces/ICardService';
import { Injectable } from '@nestjs/common';
import { CardUserData } from './dtos/CardUserDataDto';
import { CardRepository } from '../../infrastructure/repositories/CardRepository';
import { Card } from './entities/card.entities';

@Injectable()
export class CardService implements ICardService {
  constructor(private readonly flashcardRepository: CardRepository) {}

  async getAllCards(tags?: string[]): Promise<Card[]> {
    const flashcards = await this.flashcardRepository.findAll();
    if (tags && tags.length > 0) {
      return flashcards.filter((flashcard) =>
        tags.some(
          (tag) =>
            flashcard.tag &&
            flashcard.tag.toLowerCase().includes(tag.toLowerCase()),
        ),
      );
    }
    return flashcards;
  }

  async createCard(cardUserData: CardUserData): Promise<Card> {
    const newFlashcard = this.flashcardRepository.create(cardUserData);
    return this.flashcardRepository.save(newFlashcard);
  }
}
