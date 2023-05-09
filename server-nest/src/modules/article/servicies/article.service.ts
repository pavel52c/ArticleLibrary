import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ArticleEntity } from '../entities/article.entity';
import { CreateArticleDto } from '../dto/create-article.dto';
import { AbstractService } from '../../abstract/services/abstract.service';
import { ReferenceService } from '../../reference/services/reference.service';
import { HTTPError } from '../../../helpers/error';
import { ArticleTagService } from '../../articleTag/services/articleTag.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    private readonly abstractService: AbstractService,
    private readonly referenceService: ReferenceService,
    private readonly articleTagService: ArticleTagService,
  ) {}

  async create(articleDto: CreateArticleDto): Promise<ArticleEntity> {
    const { abstracts, references } = articleDto;
    const article = await this.articleRepository.save(articleDto);

    await Promise.all([
      this.abstractService.createFromArray(abstracts, article),
      this.referenceService.createFromArray(references, article),
    ]);

    return article;
  }

  async findAll(): Promise<ArticleEntity[]> {
    return this.articleRepository.find({
      relations: { abstracts: true, references: true },
    });
  }

  async findOne(id: number): Promise<ArticleEntity> {
    return await this.articleRepository.findOne({
      where: { id: id },
      relations: { abstracts: true, references: true },
    });
  }

  async find(options): Promise<ArticleEntity[]> {
    return this.articleRepository.find({
      relations: { abstracts: true, references: true },
      ...options,
    });
  }

  async remove(id: number): Promise<void> {
    const currentArticle = await this.findOne(id);
    if (currentArticle) {
      currentArticle.abstracts.map((abstract) =>
        this.abstractService.remove(abstract.id),
      );
      currentArticle.references.map((reference) =>
        this.referenceService.remove(reference.id),
      );
      await this.articleRepository.delete(id);
    }
    throw HTTPError('Нет такой статьи', HttpStatus.NOT_FOUND);
  }

  async updateArticle(articleId: number, articleData: Partial<ArticleEntity>) {
    const article = this.findOne(articleId);
    if (article)
      return await this.articleRepository.save({ ...article, ...articleData });
    else throw HTTPError('Такой статьи не существует', HttpStatus.BAD_REQUEST);
  }

  async addTagsToArticle(articleId: number, tags: number[]) {
    const article = await this.findOne(articleId);
    if (article) {
      const Tags = await this.articleTagService.findAllById(tags);
      return this.updateArticle(articleId, {
        tags: [...article.tags, ...Tags],
      });
    }
  }
}
