import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ParseLinkDto {
  @ApiProperty({
    example:
      'https://www.sciencedirect.com/science/article/pii/S2352914823000072',
    description: 'Ссылка из статьи',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly url: string;

  @ApiProperty({
    example: 'Data mining in Machine Learning',
    description: 'Текст ссылки',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;
}
