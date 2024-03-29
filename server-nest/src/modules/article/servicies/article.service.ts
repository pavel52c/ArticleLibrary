import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from '../entities/article.entity';
import { CreateArticleDto } from '../dto/create-article.dto';
import { AbstractService } from '../../abstract/services/abstract.service';
import { ReferenceService } from '../../reference/services/reference.service';
import { HTTPError } from '../../../helpers/error';
import { ArticleTagService } from '../../articleTag/services/articleTag.service';
import { AuthService } from '../../auth/services/auth.service';
import { UsersService } from '../../user/services/users.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    private readonly abstractService: AbstractService,
    private readonly referenceService: ReferenceService,
    private readonly articleTagService: ArticleTagService,
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  async create(articleDto: CreateArticleDto, request: any): Promise<void> {
    const { abstracts, references, tags = [] } = articleDto;
    const user = await this.authService.getUserByToken(request);

    const article = await this.articleRepository.save({
      title: articleDto.title,
      originLink: articleDto.originLink,
      users: [],
      abstracts: [],
      references: [],
      tags: [],
    });
    const updatedUser = await this.userService.updateUser(user, {
      articles: [...user.articles, article],
    });

    article.users = [updatedUser];

    const [savedAbstracts = [], savedReferences = [], savedTags = []] =
      await Promise.all([
        this.abstractService.createFromArray(abstracts, article),
        this.referenceService.createFromArray(references, article),
        this.articleTagService.createFromArray(tags, article, request),
      ]);

    savedTags.forEach((tag) =>
      this.articleTagService.updateTag(tag.id, {
        ...tag,
        articles: [...tag.articles, article],
      }),
    );

    await this.updateArticle(article.id, {
      ...article,
      abstracts: savedAbstracts,
      references: savedReferences,
      tags: savedTags,
    });
  }

  async findAll(): Promise<ArticleEntity[]> {
    return this.articleRepository.find({
      relations: { abstracts: true, references: true },
    });
  }

  async findOne(id: number): Promise<ArticleEntity> {
    return await this.articleRepository.findOne({
      where: { id: id },
      relations: { abstracts: true, references: true, users: true, tags: true },
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
    const article = await this.findOne(articleId);
    if (article)
      return await this.articleRepository.save({ ...article, ...articleData });
    else throw HTTPError('Такой статьи не существует', HttpStatus.BAD_REQUEST);
  }

  async addTagsToArticle(articleId: number, tags: number[]) {
    const article = await this.findOne(articleId);
    const Tags = await this.articleTagService.findAllById(tags);
    if (article && Tags) {
      return this.updateArticle(articleId, {
        tags: [...article.tags, ...Tags],
      });
    }
  }

  async addArticle(articleId: number, request: any) {
    try {
      const user = await this.authService.getUserByToken(request);
      const article = await this.findOne(articleId);
      if (user) {
        if (article) {
          await this.userService.updateUser(user, {
            ...user,
            articles: [...user.articles, article],
          });

          await this.updateArticle(articleId, {
            users: [...article.users, user],
          });
        }
      }
    } catch (e) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }
  }
}
