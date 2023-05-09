import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { AbstractEntity } from '../../abstract/entities/abstract.entity';
import { ReferenceEntity } from '../../reference/entities/reference.entity';
import { CreateAbstractDto } from '../../abstract/dto/create-abstract.dto';
import { CreateReferenceDto } from '../../reference/dto/create-reference.dto';
import { ArticleTagEntity } from '../../articleTag/entities/articleTag.entity';
import { CreateTagDto } from '../../articleTag/dto/createTagDto';
import { CreateLinkDto } from '../../link/dto/create-link.dto';

export class CreateArticleDto {
  @ApiProperty({
    example: 'Data Mining with AI',
    description: 'Заголовок статьи',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;

  @ApiProperty({
    example: [AbstractEntity],
    description: 'Секция вступления',
  })
  @IsOptional()
  readonly abstracts?: CreateAbstractDto[];

  @ApiProperty({
    example: [ReferenceEntity],
    description: 'Секция сносок',
  })
  @IsOptional()
  readonly references?: CreateReferenceDto[];

  @ApiProperty({
    example: [ArticleTagEntity],
    description: 'Тэг для статей',
  })
  @IsOptional()
  readonly tags?: CreateTagDto[];

  @ApiProperty({
    example:
      'https://www.sciencedirect.com/science/article/pii/S2352914823000072',
    description: 'Ссылка на оригинал статьи статьи',
  })
  @IsOptional()
  readonly originLink?: CreateLinkDto;
}
