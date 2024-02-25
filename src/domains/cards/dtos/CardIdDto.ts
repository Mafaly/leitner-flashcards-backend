import { ApiProperty } from '@nestjs/swagger';

export class CardId {
  @ApiProperty({
    description: 'Generated identifier of a card',
    example: '6c10ad48-2bb8-4e2e-900a-21d62c00c07b',
  })
  cardId: string;
}
