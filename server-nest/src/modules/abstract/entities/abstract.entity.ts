import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ArticleEntity } from '../../article/entities/article.entity';

@Entity()
export class AbstractEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Introduction',
    description: 'Заголовок раздела вступления(их может быть несколько)',
  })
  @Column()
  title: string;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    description: 'Тект раздела вступления',
  })
  @IsString({ message: 'Должно быть строкой' })
  description: string;

  @ManyToOne(() => ArticleEntity, (article) => article.abstracts)
  article: ArticleEntity;
}
