import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ParseAbstractsDto {
  @ApiProperty({
    example: 'Introduction',
    description: 'Заголовок раздела вступления(их может быть несколько)',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    description: 'Тект раздела вступления',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;
}
