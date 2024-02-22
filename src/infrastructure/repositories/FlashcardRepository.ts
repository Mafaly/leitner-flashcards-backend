import { IFlashcardRepository } from './interfaces/IFlashcardRepository';
import { Flashcard } from '../../domains/flashcards/entities/flashcard.entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class FlashcardRepository
  extends Repository<Flashcard>
  implements IFlashcardRepository
{
  constructor(
    @InjectRepository(Flashcard)
    private readonly flashcardRepository: Repository<Flashcard>,
  ) {
    super(
      flashcardRepository.target,
      flashcardRepository.manager,
      flashcardRepository.queryRunner,
    );
  }

  findFlashcardById(id: string): Promise<Flashcard> {
    return this.findOneBy({ id });
  }

  findAll(): Promise<Flashcard[]> {
    return this.find();
  }
}
