import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from '../../domains/cards/entities/quiz.entities';
import { endOfDay, startOfDay } from 'date-fns';
import { NotFoundException } from '@nestjs/common';

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

  /**
   * Find all cards for today's quiz. If there is no active quizz, it will return null.
   * If there is an active quizz, it will return all cards that have not been answered yet.
   * @throws NotFoundException if there are no cards for today but there were a quiz
   */
  async findTodaysQuiz() {
    const todaysQuizz = await this.findActiveQuiz();

    if (todaysQuizz === null) {
      return null;
    }

    const cards = todaysQuizz.quizCards
      .filter((quizCard) => quizCard.answered === false)
      .map((quizCard) => quizCard.card);
    if (cards.length <= 0) {
      throw new NotFoundException('No cards for today');
    }
    return cards;
  }

  async findActiveQuiz() {
    const today = new Date();
    const todayStart = startOfDay(today);
    const todayEnd = endOfDay(today);

    return await this.findOne({
      where: { startedAt: Between(todayStart, todayEnd) },
      relations: ['quizCards', 'quizCards.card'],
    });
  }
}
