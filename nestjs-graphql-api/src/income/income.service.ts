import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Income } from '../models/income.model';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Income)
    private incomeRepository: Repository<Income>,
  ) {}

  async findAll(): Promise<Income[]> {
    return this.incomeRepository.find({
      relations: ['entity', 'application', 'payor'],
    });
  }

  async findOne(id: number): Promise<Income> {
    return this.incomeRepository.findOne({
      where: { id },
      relations: ['entity', 'application', 'payor'],
    });
  }

  async findByApplicationId(applicationId: number): Promise<Income[]> {
    return this.incomeRepository.find({
      where: { applicationId },
      relations: ['entity', 'application', 'payor'],
    });
  }

  async findByNationalId(nationalId: string): Promise<Income[]> {
    return this.incomeRepository.find({
      where: { nationalId },
      relations: ['entity', 'application', 'payor'],
    });
  }

  async findByPayorId(payorId: string): Promise<Income[]> {
    return this.incomeRepository.find({
      where: { payorId },
      relations: ['entity', 'application', 'payor'],
    });
  }

  async updateIncome(id: number, updateData: Partial<Income>): Promise<Income> {
    await this.incomeRepository.update(id, updateData);
    return this.findOne(id);
  }
}