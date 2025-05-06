import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entity } from '../models/entity.model';

@Injectable()
export class EntityService {
  constructor(
    @InjectRepository(Entity)
    private entityRepository: Repository<Entity>,
  ) {}

  async findAll(): Promise<Entity[]> {
    return this.entityRepository.find({
      relations: ['assets', 'debts', 'incomes', 'paymentsIssued'],
    });
  }

  async findOne(nationalId: string): Promise<Entity> {
    return this.entityRepository.findOne({
      where: { nationalId },
      relations: ['assets', 'debts', 'incomes', 'paymentsIssued'],
    });
  }

  async findByFamilyNumber(familyNumber: string): Promise<Entity[]> {
    return this.entityRepository.find({
      where: { familyNumber },
      relations: ['assets', 'debts', 'incomes', 'paymentsIssued'],
    });
  }
}