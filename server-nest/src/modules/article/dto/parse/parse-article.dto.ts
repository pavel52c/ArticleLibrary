import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { AbstractEntity } from '../../../abstract/entities/abstract.entity';
import { CreateAbstractDto } from '../../../abstract/dto/create-abstract.dto';
import { ReferenceEntity } from '../../../reference/entities/reference.entity';
import { CreateReferenceDto } from '../../../reference/dto/create-reference.dto';

export class ParseArticleDto {
  @ApiProperty({
    example: 'Data Mining with AI',
    description: 'Заголовок статьи',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string | null;

  @ApiProperty({
    description: 'Сырые данные секции вступления',
  })
  readonly abstracts: string[] | null;

  @ApiProperty({
    description: 'Сырые данные секции сносок',
  })
  readonly references: string[] | null;

  @ApiProperty({
    example: 'scienceDirect',
    description: 'Название сайта, с которого производится парсинг',
  })
  readonly webSite: string;
}
