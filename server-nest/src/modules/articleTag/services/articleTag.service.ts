import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleTagEntity } from '../entities/articleTag.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../../user/services/users.service';
import { AuthService } from '../../auth/services/auth.service';
import { HTTPError } from '../../../helpers/error';

@Injectable()
export class ArticleTagService {
  constructor(
    @InjectRepository(ArticleTagEntity)
    private readonly articleTagRepository: Repository<ArticleTagEntity>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  async create(createTagDto, headers) {
    const token = headers.authorization;
    const user = await this.authService.getUserByToken(token);
    if (await this.findTag(createTagDto.tag))
      throw HTTPError('Такой тэг уже существует', HttpStatus.BAD_REQUEST);
    const tag = await this.articleTagRepository.save({
      ...createTagDto,
      users: [user],
    });
    await this.userService.updateUser(user, {
      favoriteTags: [...user.favoriteTags, tag],
    });
    return tag;
  }

  async findTag(tag: string) {
    return await this.articleTagRepository.find({ where: { tag } });
  }

  async findOne(tagId: number) {
    return await this.articleTagRepository.find({ where: { id: tagId } });
  }

  async findAllById(tags: number[]) {
    const arr = [];
    tags.forEach((id) => {
      arr.push(this.articleTagRepository.findOneBy({ id }));
    });
    return arr;
  }

  async findAll() {
    return await this.articleTagRepository.find({
      relations: { users: true, articles: true },
    });
  }

  async updateTag(tagId: number, tagData: Partial<ArticleTagEntity>) {
    const tag = await this.findOne(tagId);
    if (tag) {
      return await this.articleTagRepository.save({ ...tag, ...tagData });
    }
  }
}
