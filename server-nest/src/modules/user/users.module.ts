import { forwardRef, Module } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './services/users.service';
import { UsersController } from './controllres/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ArticleTagModule } from '../articleTag/articleTag.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => ArticleTagModule),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
