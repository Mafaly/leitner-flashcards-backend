import { ApiProperty } from '@nestjs/swagger';

export class CardUserData {
  @ApiProperty({
    description: 'The question for the flashcard',
    example: 'What is pair programming ?',
  })
  question: string;

  @ApiProperty({
    description: 'The answer for the flashcard',
    example: 'A practice to work in pair on same computer.',
  })
  answer: string;

  @ApiProperty({
    description: 'The tag associated with the flashcard',
    example: 'Teamwork',
    required: false,
  })
  tag?: string;
}
