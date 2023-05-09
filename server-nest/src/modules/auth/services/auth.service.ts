import {
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../user/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { HTTPError } from '../../../helpers/error';
import * as bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import { jwtConstants } from '../contsants/secretKey';
import { getTokenFromHeaders } from '../../../helpers/getTokenFromHeaders';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registration(userDto: CreateUserDto) {
    try {
      const candidate = await this.usersService.findByName(userDto.username);
      if (candidate) {
        throw HTTPError(
          'Пользователь с таким ником уже существует',
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashPassword = await bcrypt.hash(userDto.password, 5);
      return this.generateToken({ ...userDto, password: hashPassword });
    } catch (err) {
      throw HTTPError(err, HttpStatus.BAD_REQUEST);
    }
  }

  async generateToken(user: CreateUserDto) {
    const payload = { username: user.username, password: user.password };
    const refreshToken = nanoid();
    const updatedUser = await this.usersService.updateUser(user, {
      refreshToken,
    });

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: updatedUser.refreshToken,
    };
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async validateUser(userDto: CreateUserDto) {
    try {
      const user = await this.usersService.findByName(userDto.username, true);
      const passwordEquals = await bcrypt.compare(
        userDto.password,
        user.password,
      );
      if (user && passwordEquals) {
        return user;
      }
      throw new UnauthorizedException({
        message: 'Неправильное имя пользователя или пароль',
      });
    } catch (e) {
      throw new UnauthorizedException({
        message: 'Неправильное имя пользователя или пароль',
      });
    }
  }

  async checkRefreshToken(refreshToken: string) {
    try {
      const candidate = await this.usersService.findByToken(refreshToken);
      if (candidate) return this.generateToken(candidate);
      else
        throw new UnauthorizedException({
          message: 'Неправильное имя пользователя или пароль',
        });
    } catch (e) {
      throw new UnauthorizedException({
        message: 'Неправильное имя пользователя или пароль',
      });
    }
  }

  async getUserByToken(req) {
    const authHeader = req.headers.authorization || '';
    const accessToken = getTokenFromHeaders(authHeader);

    try {
      const user = this.jwtService.verify(accessToken, {
        secret: jwtConstants.secret,
      });
      return this.usersService.findByName(user.username);
    } catch (e) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }
  }
}
