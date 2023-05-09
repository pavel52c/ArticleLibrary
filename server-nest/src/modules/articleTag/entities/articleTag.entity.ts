import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ArticleEntity } from '../../article/entities/article.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity()
export class ArticleTagEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Data Mining', description: 'Название тега статьи' })
  @IsString({ message: 'Должно быть строкой' })
  @Column()
  tag: string;

  @ManyToMany(() => ArticleEntity, (article) => article.tags)
  @JoinTable()
  articles: ArticleEntity[];

  @ManyToMany(() => UserEntity, (user) => user.favoriteTags)
  @JoinTable()
  users: UserEntity[];
}
