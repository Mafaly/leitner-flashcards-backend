import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbdatasource } from './infrastructure/database/data.source';
import { CardService } from './domains/cards/CardService';
import { CardController } from './presentation/controllers/CardController';
import { QuizController } from './presentation/controllers/quiz.controller';
import { CardRepository } from './infrastructure/repositories/CardRepository';
import { Card } from './domains/cards/entities/card.entities';
import { ObjectStorageModule } from './infrastructure/object-storage/object-storage.module';
import { UsersController } from './presentation/controllers/users.controller';
import { FileRepository } from './infrastructure/repositories/FIleRepository';
import { FileEntity } from './domains/users/entities/file.entities';
import { QuizService } from './domains/cards/quiz.service';
import { Quiz } from './domains/cards/entities/quiz.entities';
import { QuizCard } from './domains/cards/entities/quizcard.entities';
import { QuizRepository } from './infrastructure/repositories/QuizRepository';
import { QuizCardRepository } from './infrastructure/repositories/QuizCardRepository';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbdatasource),
    TypeOrmModule.forFeature([Card, FileEntity, Quiz, QuizCard]),
    ObjectStorageModule,
  ],
  controllers: [AppController, UsersController, CardController, QuizController],
  providers: [
    AppService,
    CardService,
    CardRepository,
    FileRepository,
    QuizService,
    QuizRepository,
    QuizCardRepository,
  ],
})
export class AppModule {}
