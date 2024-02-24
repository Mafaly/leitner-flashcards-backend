import { IFlashcardService } from './interfaces/IFlashcardService';
import { Flashcard } from './entities/flashcard.entities';
import { Injectable } from '@nestjs/common';
import { CardUserData } from './dtos/CardUserDataDto';
import { FlashcardRepository } from '../../infrastructure/repositories/FlashcardRepository';

@Injectable()
export class FlashcardService implements IFlashcardService {
  constructor(private readonly flashcardRepository: FlashcardRepository) {}

  async getAllCards(tags?: string[]): Promise<Flashcard[]> {
    const flashcards = await this.flashcardRepository.findAll();
    if (tags && tags.length > 0) {
      return flashcards.filter((flashcard) =>
        tags.some((tag) => flashcard.tag && flashcard.tag.includes(tag)),
      );
    }
    return flashcards;
  }

  async createCard(cardUserData: CardUserData): Promise<Flashcard> {
    const newFlashcard = this.flashcardRepository.create(cardUserData);
    return this.flashcardRepository.save(newFlashcard);
  }
}
