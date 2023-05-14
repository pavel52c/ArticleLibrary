import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { HTTPError } from '../../../helpers/error';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @Post('/refreshToken')
  refreshToken(@Body() body: { refreshToken: string }) {
    if (!body.refreshToken)
      throw HTTPError('Отсутствует refresh-token', HttpStatus.BAD_REQUEST);
    return this.authService.checkRefreshToken(body.refreshToken);
  }

  @Get('/profile')
  getProfile(@Request() req) {
    return this.authService.getUserByToken(req);
  }
}
