import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbdatasource } from './infrastructure/database/data.source';
import { FlashcardService } from './domains/flashcards/FlashcardService';
import { FlashcardRepository } from './infrastructure/repositories/FlashcardRepository';
import { Flashcard } from './domains/flashcards/entities/flashcard.entities';
import { ObjectStorageModule } from './infrastructure/object-storage/object-storage.module';
import { UsersController } from './presentation/controllers/users.controller';
import { FileRepository } from './infrastructure/repositories/FIleRepository';
import { FileEntity } from './domains/users/entities/file.entities';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbdatasource),
    TypeOrmModule.forFeature([Flashcard, FileEntity]),
    ObjectStorageModule,
  ],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    FlashcardService,
    FlashcardRepository,
    FileRepository,
  ],
})
export class AppModule {}
