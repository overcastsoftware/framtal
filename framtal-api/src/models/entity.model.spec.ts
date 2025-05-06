import { Entity } from './entity.model';
import { Asset } from './asset.model';
import { Debt } from './debt.model';
import { Income } from './income.model';
import { createMockEntity, createMockAsset, createMockDebt, createMockIncome } from '../test/test-utils';

describe('Entity Model', () => {
  it('should create an instance of Entity', () => {
    const entity = new Entity();
    expect(entity).toBeInstanceOf(Entity);
  });

  it('should create an entity with all properties set', () => {
    const entity = new Entity();
    entity.nationalId = '1203894569';
    entity.familyNumber = '1203894569';
    entity.name = 'Test Person';
    entity.address = 'Test Address';
    entity.email = 'test@example.com';
    entity.phone = '123-456-7890';
    entity.postalCode = '123 City';
    
    expect(entity.nationalId).toBe('1203894569');
    expect(entity.familyNumber).toBe('1203894569');
    expect(entity.name).toBe('Test Person');
    expect(entity.address).toBe('Test Address');
    expect(entity.email).toBe('test@example.com');
    expect(entity.phone).toBe('123-456-7890');
    expect(entity.postalCode).toBe('123 City');
  });

  it('should handle nullable properties correctly', () => {
    const entity = new Entity();
    entity.nationalId = '1203894569';
    entity.familyNumber = '1203894569';
    
    expect(entity.nationalId).toBe('1203894569');
    expect(entity.familyNumber).toBe('1203894569');
    expect(entity.name).toBeUndefined();
    expect(entity.address).toBeUndefined();
    expect(entity.email).toBeUndefined();
    expect(entity.phone).toBeUndefined();
    expect(entity.postalCode).toBeUndefined();
  });

  it('should properly set relationship properties', () => {
    const entity = new Entity();
    const asset = new Asset();
    const debt = new Debt();
    const income = new Income();
    const payment = new Income();
    
    entity.assets = [asset];
    entity.debts = [debt];
    entity.incomes = [income];
    entity.paymentsIssued = [payment];
    
    expect(entity.assets).toHaveLength(1);
    expect(entity.assets[0]).toBe(asset);
    expect(entity.debts).toHaveLength(1);
    expect(entity.debts[0]).toBe(debt);
    expect(entity.incomes).toHaveLength(1);
    expect(entity.incomes[0]).toBe(income);
    expect(entity.paymentsIssued).toHaveLength(1);
    expect(entity.paymentsIssued[0]).toBe(payment);
  });

  it('should work with mock factory', () => {
    const mockEntity = createMockEntity();
    
    expect(mockEntity).toBeInstanceOf(Object);
    expect(mockEntity.nationalId).toBe('1203894569');
    expect(mockEntity.familyNumber).toBe('1203894569');
    expect(mockEntity.name).toBe('Test Person');
    expect(mockEntity.address).toBe('Test Address');
    expect(mockEntity.email).toBe('test@example.com');
    expect(mockEntity.phone).toBe('123-456-7890');
    expect(mockEntity.postalCode).toBe('123 City');
    
    // Test with overrides
    const overrideEntity = createMockEntity({ 
      nationalId: '9876543210',
      name: 'Another Person',
      email: 'another@example.com'
    });
    
    expect(overrideEntity.nationalId).toBe('9876543210');
    expect(overrideEntity.name).toBe('Another Person');
    expect(overrideEntity.email).toBe('another@example.com');
    expect(overrideEntity.familyNumber).toBe('1203894569'); // Default value remains
  });
});