import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ReferenceEntity } from '../entities/reference.entity';
import { LinkService } from '../../link/services/link.service';
import { CreateReferenceDto } from '../dto/create-reference.dto';
import { HTTPError } from '../../../helpers/error';
import { isEmpty } from '@nestjs/common/utils/shared.utils';
import { ArticleEntity } from '../../article/entities/article.entity';

@Injectable()
export class ReferenceService {
  constructor(
    @InjectRepository(ReferenceEntity)
    private readonly referenceRepository: Repository<ReferenceEntity>,
    private readonly linkService: LinkService,
  ) {}

  async create(referenceDto: CreateReferenceDto): Promise<ReferenceEntity> {
    const { links } = referenceDto;
    const newReference = await this.referenceRepository.save(referenceDto);

    links.forEach(
      async (link) =>
        await this.linkService.create({
          ...link,
          reference: newReference,
        }),
    );
    return newReference;
  }

  async createFromArray(
    referencesDto: CreateReferenceDto[],
    article: ArticleEntity,
  ): Promise<void> {
    referencesDto.forEach((referenceDto) =>
      this.create({ ...referenceDto, article }),
    );
  }

  async findAll(): Promise<ReferenceEntity[]> {
    const options = {
      relations: {
        links: true,
      },
    };

    return await this.referenceRepository.find(options);
  }

  async findOne(id: number): Promise<ReferenceEntity> {
    return await this.referenceRepository.findOneBy({ id });
  }

  async find(options): Promise<ReferenceEntity[]> {
    return await this.referenceRepository.find({
      relations: { links: true },
      ...options,
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    const reference = await this.find({
      where: { id, links: { reference: { id: id } } },
      relations: { links: true },
    }).then((reference) => reference);

    if (!isEmpty(reference)) {
      await this.linkService.removeArray(reference[0].links);
      return await this.referenceRepository.delete(id);
    } else throw HTTPError('Not Found', HttpStatus.NOT_FOUND);
  }
}
