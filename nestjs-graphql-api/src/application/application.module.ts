import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from '../models/application.model';
import { ApplicationService } from './application.service';
import { ApplicationResolver } from './application.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  providers: [ApplicationService, ApplicationResolver],
  exports: [ApplicationService],
})
export class ApplicationModule {}