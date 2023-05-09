import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractEntity } from '../entities/abstract.entity';
import { CreateAbstractDto } from '../dto/create-abstract.dto';
import { ArticleEntity } from '../../article/entities/article.entity';

@Injectable()
export class AbstractService {
  constructor(
    @InjectRepository(AbstractEntity)
    private readonly abstractRepository: Repository<AbstractEntity>,
  ) {}

  async create(abstractDto: CreateAbstractDto): Promise<AbstractEntity> {
    return this.abstractRepository.save(abstractDto);
  }

  async createFromArray(
    abstractsDto: CreateAbstractDto[],
    article: ArticleEntity,
  ): Promise<void> {
    abstractsDto.forEach((abstractDto) =>
      this.create({ ...abstractDto, article }),
    );
  }

  async findAll(): Promise<AbstractEntity[]> {
    return this.abstractRepository.find();
  }

  async findOne(id: number): Promise<AbstractEntity> {
    return await this.abstractRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.abstractRepository.delete(id);
  }

  async removeArray(array: AbstractEntity[]): Promise<void> {
    return array.forEach((item) => this.remove(item.id));
  }
}
