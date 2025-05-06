import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '../models/application.model';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  async findAll(): Promise<Application[]> {
    return this.applicationRepository.find();
  }

  async findOne(id: number): Promise<Application> {
    return this.applicationRepository.findOne({ 
      where: { id },
      relations: {
        assets: true,
        debts: {
          lender: true
        },
        incomes: {
          payor: true
        }
      }
    });
  }

  async findByFamilyNumber(familyNumber: string): Promise<Application[]> {
    return this.applicationRepository.find({ 
      where: { familyNumber },
      relations: {
        assets: true,
        debts: {
          lender: true
        },
        incomes: {
          payor: true
        }
      }
    });
  }
}