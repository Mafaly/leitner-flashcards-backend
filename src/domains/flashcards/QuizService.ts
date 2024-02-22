import { IQuizService } from './interfaces/IQuizService';
import { Quiz } from './entities/quiz';

export class QuizService implements IQuizService {
  createQuiz(): Promise<Quiz> {
    return Promise.resolve(undefined);
  }
}
