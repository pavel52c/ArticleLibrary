import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LinkEntity } from '../../link/entities/link.entity';
import { ArticleEntity } from '../../article/entities/article.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ReferenceEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Data mining in Machine Learning',
    description: 'Заголовок сноски',
  })
  @Column()
  title: string;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    description: 'Тект раздела ссылки',
  })
  @Column()
  description: string;

  @ApiProperty({
    example: [LinkEntity],
    description: 'Массив ссылок из раздела',
  })
  @OneToMany(() => LinkEntity, (link) => link.reference)
  links: LinkEntity[];

  @ManyToOne(() => ArticleEntity, (article) => article.references)
  article: ArticleEntity;
}
