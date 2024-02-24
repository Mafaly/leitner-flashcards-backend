import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { Flashcard } from '../../domains/flashcards/entities/flashcard.entities';
import {
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { FlashcardService } from '../../domains/flashcards/FlashcardService';
import { CardUserData } from '../../domains/flashcards/dtos/CardUserDataDto';

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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A list of flashcards has been successfully retrieved.',
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(Flashcard),
      },
      example: [
        {
          id: '6c10ad48-2bb8-4e2e-900a-21d62c00c07b',
          category: 'FIRST',
          question: 'What is pair programming?',
          answer: 'A practice to work in pair on the same computer.',
          tag: 'Teamwork',
        },
      ],
    },
  })
  async getAllCards(@Query('tags') tags?: string[]): Promise<Flashcard[]> {
    return this.flashcardService.getAllCards(tags);
  }

  @Post()
  @ApiBody({
    type: CardUserData,
    schema: {
      type: 'object',
      example: {
        question: 'What is pair programming ?',
        answer: 'A practice to work in pair on same computer.',
        tag: 'Teamwork',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created card',
    schema: {
      example: {
        question: 'What is pair programming ?',
        answer: 'A practice to work in pair on same computer.',
        tag: 'Teamwork',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  async createCard(@Body() cardUserData: CardUserData): Promise<Flashcard> {
    return this.flashcardService.createCard(cardUserData);
  }
}
