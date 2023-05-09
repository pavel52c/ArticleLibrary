import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LinkEntity } from '../entities/link.entity';
import { parseFromInput } from '../policies/parseFromInput';
import { parseMainPage } from '../policies/parseMainPage';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(LinkEntity)
    private readonly linkRepository: Repository<LinkEntity>,
  ) {}

  async create(linkDto: LinkEntity): Promise<LinkEntity> {
    return this.linkRepository.save(linkDto);
  }

  async findAll(): Promise<LinkEntity[]> {
    return this.linkRepository.find();
  }

  async findOne(id: number): Promise<LinkEntity> {
    return await this.linkRepository.findOneBy({ id });
  }

  async find(options): Promise<LinkEntity[]> {
    return await this.linkRepository.find(options);
  }

  async remove(id: number): Promise<void> {
    await this.linkRepository.delete(id);
  }

  async removeArray(array: LinkEntity[]): Promise<void> {
    return array.forEach((item) => this.remove(item.id));
  }

  async inputParse(input) {
    return await parseFromInput(input);
  }

  async mainPageParse() {
    return await parseMainPage();
  }
}
