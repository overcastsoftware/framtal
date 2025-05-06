import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AssetService } from './asset.service';
import { Asset } from '../models/asset.model';
import { createMockAsset, createMockRepository } from '../test/test-utils';
import { CreateAssetInput } from '../graphql/dto/create-asset.input';
import { UpdateAssetInput } from '../graphql/dto/update-asset.input';

describe('AssetService', () => {
  let service: AssetService;
  let mockAssetRepository;

  beforeEach(async () => {
    mockAssetRepository = createMockRepository();
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssetService,
        {
          provide: getRepositoryToken(Asset),
          useValue: mockAssetRepository,
        },
      ],
    }).compile();

    service = module.get<AssetService>(AssetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of assets', async () => {
      const mockAssets = [createMockAsset(), createMockAsset({ id: 2 })];
      mockAssetRepository.find.mockResolvedValue(mockAssets);

      const result = await service.findAll();
      
      expect(result).toEqual(mockAssets);
      expect(mockAssetRepository.find).toHaveBeenCalledWith({
        relations: ['entity', 'application'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a single asset by id', async () => {
      const mockAsset = createMockAsset();
      mockAssetRepository.findOne.mockResolvedValue(mockAsset);

      const result = await service.findOne(1);
      
      expect(result).toEqual(mockAsset);
      expect(mockAssetRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['entity', 'application'],
      });
    });
  });

  describe('findByApplicationId', () => {
    it('should return assets by application id', async () => {
      const mockAssets = [
        createMockAsset({ applicationId: 1 }), 
        createMockAsset({ id: 2, applicationId: 1 })
      ];
      mockAssetRepository.find.mockResolvedValue(mockAssets);

      const result = await service.findByApplicationId(1);
      
      expect(result).toEqual(mockAssets);
      expect(mockAssetRepository.find).toHaveBeenCalledWith({
        where: { applicationId: 1 },
        relations: ['entity', 'application'],
      });
    });
  });

  describe('findByNationalId', () => {
    it('should return assets by national id', async () => {
      const nationalId = '1203894569';
      const mockAssets = [
        createMockAsset({ nationalId }), 
        createMockAsset({ id: 2, nationalId })
      ];
      mockAssetRepository.find.mockResolvedValue(mockAssets);

      const result = await service.findByNationalId(nationalId);
      
      expect(result).toEqual(mockAssets);
      expect(mockAssetRepository.find).toHaveBeenCalledWith({
        where: { nationalId },
        relations: ['entity', 'application'],
      });
    });
  });

  describe('create', () => {
    it('should create a new asset', async () => {
      const mockAsset = createMockAsset();
      const createAssetInput: CreateAssetInput = {
        applicationId: 1,
        nationalId: '1203894569',
        description: 'Test Asset',
        amount: 100000,
        assetType: 'real_estate',
        assetIdentifier: 'TEST-1234',
      };
      
      mockAssetRepository.create.mockReturnValue(mockAsset);
      mockAssetRepository.save.mockResolvedValue(mockAsset);
      mockAssetRepository.findOne.mockResolvedValue(mockAsset);

      const result = await service.create(createAssetInput);
      
      expect(mockAssetRepository.create).toHaveBeenCalledWith(createAssetInput);
      expect(mockAssetRepository.save).toHaveBeenCalledWith(mockAsset);
      expect(mockAssetRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockAsset.id },
        relations: ['entity', 'application'],
      });
      expect(result).toEqual(mockAsset);
    });
  });

  describe('update', () => {
    it('should update an asset', async () => {
      const mockAsset = createMockAsset({ description: 'Updated Asset' });
      const updateAssetInput: UpdateAssetInput = {
        id: 1,
        description: 'Updated Asset',
      };
      
      mockAssetRepository.update.mockResolvedValue({ affected: 1 });
      mockAssetRepository.findOne.mockResolvedValue(mockAsset);

      const result = await service.update(updateAssetInput);
      
      expect(mockAssetRepository.update).toHaveBeenCalledWith(
        updateAssetInput.id, 
        { description: 'Updated Asset' }
      );
      expect(mockAssetRepository.findOne).toHaveBeenCalledWith({
        where: { id: updateAssetInput.id },
        relations: ['entity', 'application'],
      });
      expect(result).toEqual(mockAsset);
    });
  });

  describe('delete', () => {
    it('should delete an asset', async () => {
      mockAssetRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.delete(1);
      
      expect(mockAssetRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });

    it('should return false if asset not found', async () => {
      mockAssetRepository.delete.mockResolvedValue({ affected: 0 });

      const result = await service.delete(999);
      
      expect(mockAssetRepository.delete).toHaveBeenCalledWith(999);
      expect(result).toBe(false);
    });
  });
});