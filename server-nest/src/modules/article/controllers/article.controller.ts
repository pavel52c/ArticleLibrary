import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from '../servicies/article.service';
import { ArticleEntity } from '../entities/article.entity';
import { CreateArticleDto } from '../dto/create-article.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { parseArticle } from '../policies/parseArticle';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({ summary: 'Создание статьи' })
  @ApiResponse({ status: 200, type: ArticleEntity })
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() articleDto: CreateArticleDto) {
    return this.articleService.create(articleDto);
  }

  @ApiOperation({ summary: 'Получить статью по id' })
  @ApiResponse({ status: 200, type: ArticleEntity })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.articleService.findOne(id);
  }

  @ApiOperation({ summary: 'Получить все статьи' })
  @ApiResponse({ status: 200, type: [ArticleEntity] })
  @Get()
  async findAll(): Promise<ArticleEntity[]> {
    return this.articleService.findAll();
  }

  @ApiOperation({ summary: 'Удалить статью по id' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id')
  async remove(@Param('id') id: number) {
    return this.articleService.remove(id);
  }

  @ApiOperation({ summary: 'Спарсить статью по ссылке' })
  @ApiResponse({ status: 200, type: CreateArticleDto })
  @Post('parse')
  async parse(@Body() body) {
    return parseArticle(body);
  }

  @ApiOperation({ summary: 'Добавить теги к статье' })
  @ApiResponse({ status: 200 })
  @Post('addTags')
  async addTags(@Body() body: { articleId: number; tags: number[] }) {
    return this.articleService.addTagsToArticle(body.articleId, body.tags);
  }
}
