import { Application } from './application.model';
import { Asset } from './asset.model';
import { Debt } from './debt.model';
import { Income } from './income.model';
import { Entity } from './entity.model';
import { createMockApplication, createMockAsset, createMockDebt, createMockIncome, createMockEntity } from '../test/test-utils';

describe('Application Model', () => {
  it('should create an instance of Application', () => {
    const application = new Application();
    expect(application).toBeInstanceOf(Application);
  });

  it('should create an application with all properties set', () => {
    const application = new Application();
    application.id = 1;
    application.familyNumber = '1203894569';
    application.year = '2024';
    
    expect(application.id).toBe(1);
    expect(application.familyNumber).toBe('1203894569');
    expect(application.year).toBe('2024');
  });

  it('should properly set relationship properties', () => {
    const application = new Application();
    const asset = new Asset();
    const debt = new Debt();
    const income = new Income();
    const applicant = new Entity();
    
    application.assets = [asset];
    application.debts = [debt];
    application.incomes = [income];
    application.applicant = applicant;
    
    expect(application.assets).toHaveLength(1);
    expect(application.debts).toHaveLength(1);
    expect(application.incomes).toHaveLength(1);
    expect(application.applicant).toBe(applicant);
  });

  it('should work with mock factory', () => {
    const mockApp = createMockApplication();
    
    expect(mockApp).toBeInstanceOf(Object);
    expect(mockApp.id).toBe(1);
    expect(mockApp.familyNumber).toBe('1203894569');
    expect(mockApp.year).toBe('2024');
    
    // Test with overrides
    const overrideApp = createMockApplication({ id: 999, year: '2025' });
    expect(overrideApp.id).toBe(999);
    expect(overrideApp.year).toBe('2025');
    expect(overrideApp.familyNumber).toBe('1203894569'); // Default value remains
  });
});