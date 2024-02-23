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
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FlashcardService } from '../../domains/flashcards/FlashcardService';
import { CardUserData } from '../../domains/flashcards/dtos/CardUserData';

@ApiTags('Cards')
@Controller('cards')
export class FlashcardController {
  constructor(private flashcardService: FlashcardService) {}

  @Get()
  @ApiQuery({
    name: 'tags',
    required: false,
    type: String,
    isArray: true,
    description:
      'Tags of cards to find. If not present, all cards will be found.',
  })
  async getAllCards(@Query('tags') tags?: string[]): Promise<Flashcard[]> {
    return this.flashcardService.getAllCards(tags);
  }

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      example: {
        question: 'What is pair programming ?',
        answer: 'A practice to work in pair on same computer.',
        tag: 'Teamwork',
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  async createCard(@Body() cardUserData: CardUserData): Promise<Flashcard> {
    return this.flashcardService.createCard(cardUserData);
  }
}
