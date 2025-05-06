import { Test, TestingModule } from '@nestjs/testing';
import { AssetResolver } from './asset.resolver';
import { AssetService } from './asset.service';
import { createMockAsset } from '../test/test-utils';
import { CreateAssetInput } from '../graphql/dto/create-asset.input';
import { UpdateAssetInput } from '../graphql/dto/update-asset.input';

describe('AssetResolver', () => {
  let resolver: AssetResolver;
  let mockAssetService;

  beforeEach(async () => {
    mockAssetService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      findByApplicationId: jest.fn(),
      findByNationalId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssetResolver,
        {
          provide: AssetService,
          useValue: mockAssetService,
        },
      ],
    }).compile();

    resolver = module.get<AssetResolver>(AssetResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('assets', () => {
    it('should return an array of assets', async () => {
      const mockAssets = [createMockAsset(), createMockAsset({ id: 2 })];
      mockAssetService.findAll.mockResolvedValue(mockAssets);

      const result = await resolver.assets();

      expect(result).toEqual(mockAssets);
      expect(mockAssetService.findAll).toHaveBeenCalled();
    });
  });

  describe('asset', () => {
    it('should return a single asset by id', async () => {
      const mockAsset = createMockAsset();
      mockAssetService.findOne.mockResolvedValue(mockAsset);

      const result = await resolver.asset(1);

      expect(result).toEqual(mockAsset);
      expect(mockAssetService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('assetsByApplication', () => {
    it('should return assets by application id', async () => {
      const applicationId = 1;
      const mockAssets = [
        createMockAsset({ applicationId }), 
        createMockAsset({ id: 2, applicationId })
      ];
      mockAssetService.findByApplicationId.mockResolvedValue(mockAssets);

      const result = await resolver.assetsByApplication(applicationId);

      expect(result).toEqual(mockAssets);
      expect(mockAssetService.findByApplicationId).toHaveBeenCalledWith(applicationId);
    });
  });

  describe('assetsByNationalId', () => {
    it('should return assets by national id', async () => {
      const nationalId = '1203894569';
      const mockAssets = [
        createMockAsset({ nationalId }), 
        createMockAsset({ id: 2, nationalId })
      ];
      mockAssetService.findByNationalId.mockResolvedValue(mockAssets);

      const result = await resolver.assetsByNationalId(nationalId);

      expect(result).toEqual(mockAssets);
      expect(mockAssetService.findByNationalId).toHaveBeenCalledWith(nationalId);
    });
  });

  describe('createAsset', () => {
    it('should create and return a new asset', async () => {
      const mockAsset = createMockAsset();
      const createAssetInput: CreateAssetInput = {
        applicationId: 1,
        nationalId: '1203894569',
        description: 'Test Asset',
        amount: 100000,
        assetType: 'real_estate',
        assetIdentifier: 'TEST-1234',
      };
      
      mockAssetService.create.mockResolvedValue(mockAsset);

      const result = await resolver.createAsset(createAssetInput);

      expect(result).toEqual(mockAsset);
      expect(mockAssetService.create).toHaveBeenCalledWith(createAssetInput);
    });
  });

  describe('updateAsset', () => {
    it('should update and return the updated asset', async () => {
      const mockAsset = createMockAsset({ description: 'Updated Asset' });
      const updateAssetInput: UpdateAssetInput = {
        id: 1,
        description: 'Updated Asset',
      };
      
      mockAssetService.update.mockResolvedValue(mockAsset);

      const result = await resolver.updateAsset(updateAssetInput);

      expect(result).toEqual(mockAsset);
      expect(mockAssetService.update).toHaveBeenCalledWith(updateAssetInput);
    });
  });

  describe('deleteAsset', () => {
    it('should delete an asset and return true when successful', async () => {
      mockAssetService.delete.mockResolvedValue(true);

      const result = await resolver.deleteAsset(1);

      expect(result).toBe(true);
      expect(mockAssetService.delete).toHaveBeenCalledWith(1);
    });

    it('should return false when asset deletion fails', async () => {
      mockAssetService.delete.mockResolvedValue(false);

      const result = await resolver.deleteAsset(999);

      expect(result).toBe(false);
      expect(mockAssetService.delete).toHaveBeenCalledWith(999);
    });
  });
});