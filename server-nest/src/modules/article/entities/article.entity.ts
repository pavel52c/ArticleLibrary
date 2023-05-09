import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReferenceEntity } from '../../reference/entities/reference.entity';
import { AbstractEntity } from '../../abstract/entities/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../user/entities/user.entity';
import { ArticleTagEntity } from '../../articleTag/entities/articleTag.entity';

@Entity()
export class ArticleEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '1', description: 'Заголовок статьи' })
  @Column()
  title: string;

  @ApiProperty({
    example: [AbstractEntity],
    description: 'Раздел вступления',
  })
  @OneToMany(() => AbstractEntity, (abstract) => abstract.article)
  abstracts: AbstractEntity[];

  @ApiProperty({
    example: [ReferenceEntity],
    description: 'Раздел сносок',
  })
  @OneToMany(() => ReferenceEntity, (reference) => reference.article)
  references: ReferenceEntity[];

  @ManyToMany(() => UserEntity, (user: UserEntity) => user.articles)
  @JoinTable()
  users: UserEntity[];

  @ManyToMany(() => ArticleTagEntity)
  @JoinTable()
  tags: ArticleTagEntity[];
}
