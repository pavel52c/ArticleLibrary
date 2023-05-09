import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbstractService } from './services/abstract.service';
import { AbstractEntity } from './entities/abstract.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AbstractEntity])],
  providers: [AbstractService],
  exports: [AbstractService],
})
export class AbstractModule {}
