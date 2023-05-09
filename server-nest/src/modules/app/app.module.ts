import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './servicies/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../user/users.module';
import { ArticleModule } from '../article/article.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { LinkModule } from '../link/link.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dbConfig = require('../../../ormconfig');

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(dbConfig),
    UsersModule,
    ArticleModule,
    AuthModule,
    LinkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
