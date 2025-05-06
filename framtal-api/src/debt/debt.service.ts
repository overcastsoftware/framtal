import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Debt } from '../models/debt.model';
import { UpdateDebtInput } from '../graphql/dto/update-debt.input';
import { CreateDebtInput } from '../graphql/dto/create-debt.input';

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
      relations: ['entity', 'application', 'lender'],
    });
  }

  async findByApplicationId(applicationId: number): Promise<Debt[]> {
    return this.debtRepository.find({
      where: { applicationId },
      relations: ['entity', 'application', 'lender'],
    });
  }

  async findByNationalId(nationalId: string): Promise<Debt[]> {
    return this.debtRepository.find({
      where: { nationalId },
      relations: ['entity', 'application', 'lender'],
    });
  }

  async update(updateDebtInput: UpdateDebtInput): Promise<Debt> {
    const { id, ...updateData } = updateDebtInput;
    await this.debtRepository.update(id, updateData);
    return this.findOne(id);
  }

  async create(createDebtInput: CreateDebtInput): Promise<Debt> {
    const debt = this.debtRepository.create(createDebtInput);
    await this.debtRepository.save(debt);
    return this.findOne(debt.id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.debtRepository.delete(id);
    return result.affected > 0;
  }
}