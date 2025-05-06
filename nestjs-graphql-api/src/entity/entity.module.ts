import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entity } from '../models/entity.model';
import { EntityService } from './entity.service';
import { EntityResolver } from './entity.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  providers: [EntityService, EntityResolver],
  exports: [EntityService],
})
export class EntityModule {}