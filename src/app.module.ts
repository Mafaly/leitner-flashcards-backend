import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbdatasource } from './infrastructure/database/data.source';
import { CardService } from './domains/cards/CardService';
import { CardController } from './presentation/controllers/CardController';
import { QuizzController } from './presentation/controllers/QuizzController';
import { QuizzService } from './domains/cards/QuizzService';
import { CardRepository } from './infrastructure/repositories/CardRepository';
import { Card } from './domains/cards/entities/card.entities';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbdatasource),
    TypeOrmModule.forFeature([Card]),
  ],
  controllers: [AppController, CardController, QuizzController],
  providers: [AppService, CardService, QuizzService, CardRepository],
})
export class AppModule {}
