import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { Flashcard } from '../../domains/flashcards/entities/flashcard.entities';
import { QuizzService } from '../../domains/flashcards/QuizzService';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Learning')
@Controller('cards')
export class QuizzController {
  constructor(private readonly quizzService: QuizzService) {}

  @Get('/quizz')
  @ApiQuery({
    name: 'date',
    required: false,
    type: String,
    example: '2024-02-22',
    description: 'Date of quizz. If not provided, date will be today.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All cards of quizz for today',
    type: Flashcard,
    isArray: true,
  })
  async getCardsForQuizz(@Query('date') date?: string): Promise<Flashcard[]> {
    return this.quizzService.getCardsForQuizz(date);
  }

  @Patch('/:cardId/answer')
  @ApiQuery({
    name: 'cardId',
    required: true,
    type: String,
    example: '6c10ad48-2bb8-4e2e-900a-21d62c00c07b',
    description: 'Id of answered card.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['isValid'],
      properties: {
        isValid: { type: 'boolean' },
      },
      example: { isValid: true },
    },
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Answer has been taken into account',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Card not found',
  })
  async answerCard(
    @Param('cardId') cardId: string,
    @Body('isValid') isValid: boolean,
  ): Promise<void> {
    return this.quizzService.answerCard(cardId, isValid);
  }
}
