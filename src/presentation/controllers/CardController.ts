import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import {
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { CardService } from '../../domains/cards/CardService';
import { CardUserData } from '../../domains/cards/dtos/CardUserDataDto';
import { Card } from '../../domains/cards/entities/card.entities';

@ApiTags('Cards')
@Controller('cards')
export class CardController {
  constructor(private cardService: CardService) {}

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
    description: 'Found cards by tag query',
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(Card),
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
  async getAllCards(@Query('tags') tags?: string[]): Promise<Card[]> {
    return this.cardService.getAllCards(tags);
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
  async createCard(@Body() cardUserData: CardUserData): Promise<Card> {
    return this.cardService.createCard(cardUserData);
  }
}
