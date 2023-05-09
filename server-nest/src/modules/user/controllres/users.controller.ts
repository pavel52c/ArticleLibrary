import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Headers,
  Request,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserEntity } from '../entities/user.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthService } from '../../auth/services/auth.service';

type UserResponse = Omit<UserEntity, 'password'>;

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [UserEntity] })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<UserResponse[]> {
    return await this.userService.findAll();
  }

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Post('create')
  async create(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  @ApiOperation({ summary: 'Получить одного пользователя по id' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Get(':username')
  async findByName(@Param('id') username: string): Promise<UserResponse> {
    return await this.userService.findByName(username);
  }

  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Delete('remove/:username')
  async remove(@Param('username') username: string) {
    return this.userService.remove(username);
  }

  @Post('addTags')
  async addTags(@Headers() headers, @Body() body: { tags: number[] }) {
    return await this.userService.addFavoriteTags(headers, body.tags);
  }
}
