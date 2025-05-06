import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Debt } from '../models/debt.model';

@Injectable()
export class DebtService {
  constructor(
    @InjectRepository(Debt)
    private debtRepository: Repository<Debt>,
  ) {}

  async findAll(): Promise<Debt[]> {
    return this.debtRepository.find({
      relations: ['entity', 'application'],
    });
  }

  async findOne(id: number): Promise<Debt> {
    return this.debtRepository.findOne({
      where: { id },
      relations: ['entity', 'application'],
    });
  }

  async findByApplicationId(applicationId: number): Promise<Debt[]> {
    return this.debtRepository.find({
      where: { applicationId },
      relations: ['entity', 'application'],
    });
  }

  async findByNationalId(nationalId: string): Promise<Debt[]> {
    return this.debtRepository.find({
      where: { nationalId },
      relations: ['entity', 'application'],
    });
  }
}