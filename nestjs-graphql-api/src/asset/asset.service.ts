import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from '../models/asset.model';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset)
    private assetRepository: Repository<Asset>,
  ) {}

  async findAll(): Promise<Asset[]> {
    return this.assetRepository.find({
      relations: ['entity', 'application'],
    });
  }

  async findOne(id: number): Promise<Asset> {
    return this.assetRepository.findOne({
      where: { id },
      relations: ['entity', 'application'],
    });
  }

  async findByApplicationId(applicationId: number): Promise<Asset[]> {
    return this.assetRepository.find({
      where: { applicationId },
      relations: ['entity', 'application'],
    });
  }

  async findByNationalId(nationalId: string): Promise<Asset[]> {
    return this.assetRepository.find({
      where: { nationalId },
      relations: ['entity', 'application'],
    });
  }
}