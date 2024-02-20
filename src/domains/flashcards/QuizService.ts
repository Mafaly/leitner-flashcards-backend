import { IQuizService } from './interfaces/IQuizService';
import { Quiz } from './entities/Quiz';

export class QuizService implements IQuizService {
  createQuiz(quiz: Quiz): Promise<Quiz> {
    return Promise.resolve(undefined);
  }
}
