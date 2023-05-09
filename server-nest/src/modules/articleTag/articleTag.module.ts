import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleTagEntity } from './entities/articleTag.entity';
import { ArticleTagService } from './services/articleTag.service';
import { UsersModule } from '../user/users.module';
import { AuthModule } from '../auth/auth.module';
import { ArticleTagController } from './controllers/articleTag.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleTagEntity]),
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
  ],
  providers: [ArticleTagService],
  controllers: [ArticleTagController],
  exports: [ArticleTagService],
})
export class ArticleTagModule {}
