import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ArticleTagService } from '../services/articleTag.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ArticleTagEntity } from '../entities/articleTag.entity';
import { CreateTagDto } from '../dto/createTagDto';

@Controller('articleTags')
export class ArticleTagController {
  constructor(private readonly articleTagService: ArticleTagService) {}

  @ApiOperation({ summary: 'Получить все теги статей' })
  @ApiResponse({ status: 200, type: [ArticleTagEntity] })
  @Get()
  async findAll(): Promise<ArticleTagEntity[]> {
    return await this.articleTagService.findAll();
  }

  @ApiOperation({ summary: 'Создание тэга для статьи' })
  @ApiResponse({ status: 200, type: ArticleTagEntity })
  @Post('create')
  async create(@Body() createTagDto: CreateTagDto, @Request() req) {
    return this.articleTagService.create(createTagDto, req);
  }
}
