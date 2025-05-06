import { Income } from './income.model';
import { Application } from './application.model';
import { Entity } from './entity.model';
import { createMockIncome, createMockApplication, createMockEntity } from '../test/test-utils';

describe('Income Model', () => {
  it('should create an instance of Income', () => {
    const income = new Income();
    expect(income).toBeInstanceOf(Income);
  });

  it('should create an income with all properties set', () => {
    const income = new Income();
    income.id = 1;
    income.applicationId = 1;
    income.nationalId = '1203894569';
    income.payorId = '5501119999';
    income.amount = 450000;
    income.incomeType = 'salary';
    
    expect(income.id).toBe(1);
    expect(income.applicationId).toBe(1);
    expect(income.nationalId).toBe('1203894569');
    expect(income.payorId).toBe('5501119999');
    expect(income.amount).toBe(450000);
    expect(income.incomeType).toBe('salary');
  });

  it('should handle nullable properties correctly', () => {
    const income = new Income();
    income.id = 1;
    income.applicationId = 1;
    income.nationalId = '1203894569';
    income.payorId = '5501119999';
    
    expect(income.id).toBe(1);
    expect(income.applicationId).toBe(1);
    expect(income.nationalId).toBe('1203894569');
    expect(income.payorId).toBe('5501119999');
    expect(income.amount).toBeUndefined();
    expect(income.incomeType).toBeUndefined();
  });

  it('should properly set relationship properties', () => {
    const income = new Income();
    const application = new Application();
    const entity = new Entity();
    const payor = new Entity();
    
    income.application = application;
    income.entity = entity;
    income.payor = payor;
    
    expect(income.application).toBe(application);
    expect(income.entity).toBe(entity);
    expect(income.payor).toBe(payor);
  });

  it('should work with mock factory', () => {
    const mockIncome = createMockIncome();
    
    expect(mockIncome).toBeInstanceOf(Object);
    expect(mockIncome.id).toBe(1);
    expect(mockIncome.applicationId).toBe(1);
    expect(mockIncome.nationalId).toBe('1203894569');
    expect(mockIncome.payorId).toBe('5501119999');
    expect(mockIncome.amount).toBe(450000);
    expect(mockIncome.incomeType).toBe('salary');
    
    // Test with overrides
    const overrideIncome = createMockIncome({ 
      id: 999, 
      amount: 600000,
      incomeType: 'bonus',
      payorId: '6612250001'
    });
    
    expect(overrideIncome.id).toBe(999);
    expect(overrideIncome.amount).toBe(600000);
    expect(overrideIncome.incomeType).toBe('bonus');
    expect(overrideIncome.payorId).toBe('6612250001');
    expect(overrideIncome.nationalId).toBe('1203894569'); // Default value remains
  });
});