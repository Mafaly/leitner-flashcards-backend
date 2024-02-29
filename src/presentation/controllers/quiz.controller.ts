import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Card } from '../../domains/cards/entities/card.entities';
import { QuizService } from '../../domains/cards/quiz.service';

@ApiTags('Learning')
@Controller('cards')
export class QuizController {
  constructor(private readonly quizzService: QuizService) {}

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
    type: Card,
    isArray: true,
  })
  async getCardsForQuizz(): Promise<Card[]> {
    return this.quizzService.getCardsForQuizz();
  }

  @Patch('/:cardId/answer')
  @ApiParam({
    name: 'cardId',
    required: true,
    type: String,
    example: '6c10ad48-2bb8-4e2e-900a-21d62c00c07b',
    description: 'Id of answered card of type CardID',
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
    if (isValid === undefined || typeof isValid !== 'boolean')
      throw new BadRequestException(
        'isValid is required and must be a boolean.',
      );
    return this.quizzService.answerCard(cardId, isValid);
  }
}
