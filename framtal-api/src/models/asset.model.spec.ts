import { Asset } from './asset.model';
import { Application } from './application.model';
import { Entity } from './entity.model';
import { createMockAsset, createMockApplication, createMockEntity } from '../test/test-utils';

describe('Asset Model', () => {
  it('should create an instance of Asset', () => {
    const asset = new Asset();
    expect(asset).toBeInstanceOf(Asset);
  });

  it('should create an asset with all properties set', () => {
    const asset = new Asset();
    asset.id = 1;
    asset.applicationId = 1;
    asset.nationalId = '1203894569';
    asset.description = 'Test Asset';
    asset.amount = 100000;
    asset.assetType = 'real_estate';
    asset.assetIdentifier = 'TEST-1234';
    
    expect(asset.id).toBe(1);
    expect(asset.applicationId).toBe(1);
    expect(asset.nationalId).toBe('1203894569');
    expect(asset.description).toBe('Test Asset');
    expect(asset.amount).toBe(100000);
    expect(asset.assetType).toBe('real_estate');
    expect(asset.assetIdentifier).toBe('TEST-1234');
  });

  it('should handle nullable properties correctly', () => {
    const asset = new Asset();
    asset.id = 1;
    asset.applicationId = 1;
    asset.nationalId = '1203894569';
    
    expect(asset.id).toBe(1);
    expect(asset.applicationId).toBe(1);
    expect(asset.nationalId).toBe('1203894569');
    expect(asset.description).toBeUndefined();
    expect(asset.amount).toBeUndefined();
    expect(asset.assetType).toBeUndefined();
    expect(asset.assetIdentifier).toBeUndefined();
  });

  it('should properly set relationship properties', () => {
    const asset = new Asset();
    const application = new Application();
    const entity = new Entity();
    
    asset.application = application;
    asset.entity = entity;
    
    expect(asset.application).toBe(application);
    expect(asset.entity).toBe(entity);
  });

  it('should work with mock factory', () => {
    const mockAsset = createMockAsset();
    
    expect(mockAsset).toBeInstanceOf(Object);
    expect(mockAsset.id).toBe(1);
    expect(mockAsset.applicationId).toBe(1);
    expect(mockAsset.nationalId).toBe('1203894569');
    expect(mockAsset.description).toBe('Test Asset');
    expect(mockAsset.amount).toBe(100000);
    expect(mockAsset.assetType).toBe('real_estate');
    expect(mockAsset.assetIdentifier).toBe('TEST-1234');
    
    // Test with overrides
    const overrideAsset = createMockAsset({ id: 999, amount: 500000, assetType: 'vehicle' });
    expect(overrideAsset.id).toBe(999);
    expect(overrideAsset.amount).toBe(500000);
    expect(overrideAsset.assetType).toBe('vehicle');
    expect(overrideAsset.nationalId).toBe('1203894569'); // Default value remains
  });
});