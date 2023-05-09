import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { LinkEntity } from '../../link/entities/link.entity';
import { CreateLinkDto } from '../../link/dto/create-link.dto';
import { ArticleEntity } from '../../article/entities/article.entity';

export class CreateReferenceDto {
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
    example: [CreateLinkDto],
    description: 'Массив ссылок из раздела',
  })
  readonly links: LinkEntity[];

  @ApiProperty({
    example: [ArticleEntity],
    description: 'Статья к которой принадлежит сноска',
  })
  readonly article: ArticleEntity;
}
