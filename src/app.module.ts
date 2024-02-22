import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbdatasource } from './infrastructure/database/data.source';
import { FlashcardService } from './domains/flashcards/FlashcardService';
import { FlashcardRepository } from './infrastructure/repositories/FlashcardRepository';
import { Flashcard } from './domains/flashcards/entities/flashcard.entities';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbdatasource),
    TypeOrmModule.forFeature([Flashcard]),
  ],
  controllers: [AppController],
  providers: [AppService, FlashcardService, FlashcardRepository],
})
export class AppModule {}
