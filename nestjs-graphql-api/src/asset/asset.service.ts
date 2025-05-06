import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from '../models/asset.model';
import { UpdateAssetInput } from '../graphql/dto/update-asset.input';
import { CreateAssetInput } from '../graphql/dto/create-asset.input';

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
  
  async update(updateAssetInput: UpdateAssetInput): Promise<Asset> {
    const { id, ...updateData } = updateAssetInput;
    await this.assetRepository.update(id, updateData);
    return this.findOne(id);
  }
  
  async create(createAssetInput: CreateAssetInput): Promise<Asset> {
    const asset = this.assetRepository.create(createAssetInput);
    await this.assetRepository.save(asset);
    return this.findOne(asset.id);
  }
  
  async delete(id: number): Promise<boolean> {
    const result = await this.assetRepository.delete(id);
    return result.affected > 0;
  }
}