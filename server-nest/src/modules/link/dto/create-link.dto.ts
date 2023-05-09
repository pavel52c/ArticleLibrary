import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateLinkDto {
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

  @ApiProperty({
    example: '1',
    description: 'id сноски к которой относится эта ссылка',
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  readonly reference?: string;
}
