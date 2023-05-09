import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { nanoid } from 'nanoid';
import { ArticleEntity } from '../../article/entities/article.entity';
import { ArticleTagEntity } from '../../articleTag/entities/articleTag.entity';

@Entity()
export class UserEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'username', description: 'Имя пользователя' })
  @Column()
  username: string;

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @Column()
  password: string;

  @ApiProperty({ example: false, description: 'Заблокирован или нет' })
  @Column({ default: false })
  banned: boolean;

  @ApiProperty({ example: nanoid(), description: 'Рефреш токен' })
  @Column()
  refreshToken: string;

  @ManyToMany(() => ArticleEntity, (article: ArticleEntity) => article.users)
  @JoinTable()
  @IsOptional()
  articles?: ArticleEntity[];

  @ManyToMany(() => ArticleTagEntity)
  @JoinTable()
  @IsOptional()
  favoriteTags?: ArticleTagEntity[];
}
