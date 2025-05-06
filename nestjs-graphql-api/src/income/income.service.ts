import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Income } from '../models/income.model';
import { UpdateIncomeInput } from '../graphql/dto';
import { CreateIncomeInput } from '../graphql/dto';

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

  async create(createIncomeInput: CreateIncomeInput): Promise<Income> {
    const income = this.incomeRepository.create(createIncomeInput);
    await this.incomeRepository.save(income);
    return this.findOne(income.id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.incomeRepository.delete(id);
    return result.affected > 0;
  }
}