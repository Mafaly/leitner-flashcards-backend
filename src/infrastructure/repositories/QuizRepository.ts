import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from '../../domains/cards/entities/quiz.entities';
import { endOfDay, startOfDay } from 'date-fns';

export class QuizRepository extends Repository<Quiz> {
  constructor(
    @InjectRepository(Quiz)
    private readonly flashQuizRepository: Repository<Quiz>,
  ) {
    super(
      flashQuizRepository.target,
      flashQuizRepository.manager,
      flashQuizRepository.queryRunner,
    );
  }

  async findTodaysQuiz() {
    const today = new Date();
    const todayStart = startOfDay(today);
    const todayEnd = endOfDay(today);

    const todaysQuizz = await this.findOne({
      where: { startedAt: Between(todayStart, todayEnd) },
      relations: ['quizCards', 'quizCards.card'],
    });

    if (todaysQuizz !== null) {
      const cards = todaysQuizz.quizCards
        .filter((quizCard) => quizCard.answered == false)
        .map((quizCard) => quizCard.card);
      if (cards.length <= 0) {
        return null;
      }
      return cards;
    }
  }
}
