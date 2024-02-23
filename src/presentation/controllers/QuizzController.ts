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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Learning')
@Controller('cards')
export class QuizzController {
  constructor(private readonly quizzService: QuizzService) {}

  @Get('/quizz')
  async getCardsForQuizz(@Query('date') date?: string): Promise<Flashcard[]> {
    return this.quizzService.getCardsForQuizz(date);
  }

  @Patch('/:cardId/answer')
  @HttpCode(HttpStatus.NO_CONTENT)
  async answerCard(
    @Param('cardId') cardId: string,
    @Body('isValid') isValid: boolean,
  ): Promise<void> {
    return this.quizzService.answerCard(cardId, isValid);
  }
}
