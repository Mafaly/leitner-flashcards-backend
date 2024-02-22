import { IFlashcardService } from './interfaces/IFlashcardService';
import { Flashcard } from './entities/flashcard.entities';
import { Injectable } from '@nestjs/common';
import { FlashcardRepository } from '../../infrastructure/repositories/FlashcardRepository';

@Injectable()
export class FlashcardService implements IFlashcardService {
  constructor(private readonly flashcardRepository: FlashcardRepository) {}

  getFlashcardById(flashcardId: string): Promise<Flashcard> {
    return this.flashcardRepository.findFlashcardById(flashcardId);
  }

  getFlashcards(): Promise<Flashcard[]> {
    return this.flashcardRepository.findAll();
  }
}
