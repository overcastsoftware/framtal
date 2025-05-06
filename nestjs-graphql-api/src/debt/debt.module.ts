import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Debt } from '../models/debt.model';
import { DebtService } from './debt.service';
import { DebtResolver } from './debt.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Debt])],
  providers: [DebtService, DebtResolver],
  exports: [DebtService],
})
export class DebtModule {}