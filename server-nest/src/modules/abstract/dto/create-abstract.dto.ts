import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ArticleEntity } from '../../article/entities/article.entity';

export class CreateAbstractDto {
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

  @ApiProperty({
    example: [ArticleEntity],
    description: 'Статья к которой привязан данный раздел вступления',
  })
  readonly article: ArticleEntity;
}
