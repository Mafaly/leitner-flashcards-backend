import { Quiz } from '../entities/quiz';

export interface IQuizService {
  createQuiz(): Promise<Quiz>;
}
