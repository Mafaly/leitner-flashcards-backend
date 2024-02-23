import { IFlashcardService } from './interfaces/IFlashcardService';
import { Flashcard } from './entities/flashcard.entities';
import { Injectable } from '@nestjs/common';
import { CardUserData } from './dtos/CardUserData';

@Injectable()
export class FlashcardService implements IFlashcardService {
  getAllCards(tags?: string[]): Promise<Flashcard[]> {
    return Promise.resolve([]);
  }

  createCard(cardUserData: CardUserData): Promise<Flashcard> {
    return Promise.resolve(undefined);
  }
}
