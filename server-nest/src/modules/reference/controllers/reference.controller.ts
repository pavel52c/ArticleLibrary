import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReferenceService } from '../services/reference.service';
import { ReferenceEntity } from '../entities/reference.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateReferenceDto } from '../dto/create-reference.dto';

@Controller('references')
export class ReferenceController {
  constructor(private readonly referenceService: ReferenceService) {}

  @ApiOperation({ summary: 'Создание сноски' })
  @ApiResponse({ status: 200, type: ReferenceEntity })
  @Post('create')
  async create(@Body() referenceData: CreateReferenceDto) {
    return this.referenceService.create(referenceData);
  }

  @ApiOperation({ summary: 'Получить одну сноску по id' })
  @ApiResponse({ status: 200, type: ReferenceEntity })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.referenceService.findOne(id);
  }

  @ApiOperation({ summary: 'Получить все сноски' })
  @ApiResponse({ status: 200, type: [ReferenceEntity] })
  @Get()
  async findAll(): Promise<ReferenceEntity[]> {
    return this.referenceService.findAll();
  }

  @ApiOperation({ summary: 'Создание сноски' })
  @ApiResponse({ status: 200, type: ReferenceEntity })
  @Delete('remove/:id')
  async remove(@Param('id') id: number) {
    await this.referenceService.remove(id);
  }
}
