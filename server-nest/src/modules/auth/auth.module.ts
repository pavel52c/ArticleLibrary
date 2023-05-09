import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from '../user/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { jwtConstants } from './contsants/secretKey';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      privateKey: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
