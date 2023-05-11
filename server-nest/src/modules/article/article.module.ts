import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './entities/article.entity';
import { ArticleService } from './servicies/article.service';
import { ArticleController } from './controllers/article.controller';
import { ReferenceModule } from '../reference/reference.module';
import { AbstractModule } from '../abstract/abstract.module';
import { AuthModule } from '../auth/auth.module';
import { ArticleTagModule } from '../articleTag/articleTag.module';
import { UsersModule } from '../user/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleEntity]),
    ReferenceModule,
    AbstractModule,
    AuthModule,
    ArticleTagModule,
    UsersModule,
  ],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
