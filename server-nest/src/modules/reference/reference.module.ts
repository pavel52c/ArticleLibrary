import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferenceEntity } from './entities/reference.entity';
import { ReferenceService } from './services/reference.service';
import { ReferenceController } from './controllers/reference.controller';
import { LinkModule } from '../link/link.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReferenceEntity]), LinkModule],
  providers: [ReferenceService],
  controllers: [ReferenceController],
  exports: [ReferenceService],
})
export class ReferenceModule {}
