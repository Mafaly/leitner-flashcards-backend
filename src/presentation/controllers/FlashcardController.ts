import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { Flashcard } from '../../domains/flashcards/entities/flashcard.entities';
import { ApiTags } from '@nestjs/swagger';
import { FlashcardService } from '../../domains/flashcards/FlashcardService';

@ApiTags('Cards')
@Controller('cards')
export class FlashcardController {
  constructor(private flashcardService: FlashcardService) {}

  @Get()
  async getAllCards(@Query('tags') tags?: string[]): Promise<Flashcard[]> {
    return this.flashcardService.getAllCards(tags);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCard(@Body() cardUserData: CardUserData): Promise<Flashcard> {
    return this.flashcardService.createCard(cardUserData);
  }
}
