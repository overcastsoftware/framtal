import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { Entity } from '../models/entity.model';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}