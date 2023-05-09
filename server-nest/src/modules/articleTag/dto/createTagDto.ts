import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({ example: 'Data Mining', description: 'Название тега статьи' })
  @IsString({ message: 'Должно быть строкой' })
  readonly tag: string;
}
