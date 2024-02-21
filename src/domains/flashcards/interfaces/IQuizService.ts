import { Quiz } from '../entities/Quiz';

export interface IQuizService {
  createQuiz(quiz: Quiz): Promise<Quiz>;
}
