import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ParseLinkDto } from './parse-link.dto';

export class ParseReferencesDto {
  @ApiProperty({
    example: 'Data Mining with AI',
    description: 'Общий заголовок раздела ссылки',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    description: 'Тект раздела ссылки',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;

  @ApiProperty({
    example: [ParseLinkDto],
    description: 'Массив ссылок из раздела',
  })
  readonly links: ParseLinkDto[];
}
