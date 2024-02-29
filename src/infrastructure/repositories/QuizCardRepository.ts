import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizCard } from '../../domains/cards/entities/quizcard.entities';

export class QuizCardRepository extends Repository<QuizCard> {
  constructor(
    @InjectRepository(QuizCard)
    private readonly quizCardRepository: Repository<QuizCard>,
  ) {
    super(
      quizCardRepository.target,
      quizCardRepository.manager,
      quizCardRepository.queryRunner,
    );
  }
}
