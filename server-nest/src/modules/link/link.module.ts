import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkEntity } from './entities/link.entity';
import { LinkService } from './services/link.service';
import { LinkController } from './controllers/link.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LinkEntity])],
  controllers: [LinkController],
  providers: [LinkService],
  exports: [LinkService],
})
export class LinkModule {}
