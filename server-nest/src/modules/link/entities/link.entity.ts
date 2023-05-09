import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ReferenceEntity } from '../../reference/entities/reference.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class LinkEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example:
      'https://www.sciencedirect.com/science/article/pii/S2352914823000072',
    description: 'Ссылка из статьи',
  })
  @Column()
  url: string;

  @ApiProperty({
    example: 'Data mining in Machine Learning',
    description: 'Текст ссылки',
  })
  @Column()
  description: string;

  @ApiProperty({
    example: [ReferenceEntity],
    description: 'Ссылка на общую сноску, к которой привязана локальная ссылка',
  })
  @ManyToOne(() => ReferenceEntity, (reference) => reference.links)
  reference: ReferenceEntity;
}
