import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../contsants/secretKey';
import { getTokenFromHeaders } from '../../../helpers/getTokenFromHeaders';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization || '';
      const accessToken = getTokenFromHeaders(authHeader);

      req.user = this.jwtService.verify(accessToken, {
        secret: jwtConstants.secret,
      });

      if (req.user) return true;
    } catch (e) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }
  }
}
