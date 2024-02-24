import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbdatasource } from './infrastructure/database/data.source';
import { FlashcardService } from './domains/flashcards/FlashcardService';
import { Flashcard } from './domains/flashcards/entities/flashcard.entities';
import { FlashcardController } from './presentation/controllers/FlashcardController';
import { QuizzController } from './presentation/controllers/QuizzController';
import { QuizzService } from './domains/flashcards/QuizzService';
import { FlashcardRepository } from './infrastructure/repositories/FlashcardRepository';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbdatasource),
    TypeOrmModule.forFeature([Flashcard]),
  ],
  controllers: [AppController, FlashcardController, QuizzController],
  providers: [AppService, FlashcardService, QuizzService, FlashcardRepository],
})
export class AppModule {}
