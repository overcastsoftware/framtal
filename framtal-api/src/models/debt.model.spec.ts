import { Debt } from './debt.model';
import { Application } from './application.model';
import { Entity } from './entity.model';
import { createMockDebt, createMockApplication, createMockEntity } from '../test/test-utils';

describe('Debt Model', () => {
  it('should create an instance of Debt', () => {
    const debt = new Debt();
    expect(debt).toBeInstanceOf(Debt);
  });

  it('should create a debt with all properties set', () => {
    const debt = new Debt();
    debt.id = 1;
    debt.applicationId = 1;
    debt.nationalId = '1203894569';
    debt.description = 'Test Debt';
    debt.descriptionSecondary = 'Additional Info';
    debt.loanType = 'property';
    debt.lenderId = '4910080160';
    debt.loanNumber = '12345';
    debt.loanDate = new Date('2023-01-01');
    debt.loanLength = '30';
    debt.totalPayment = 2000000;
    debt.principalPayment = 1000000;
    debt.deduction = 0;
    debt.totalCost = 1000000;
    debt.amount = 20000000;
    
    expect(debt.id).toBe(1);
    expect(debt.applicationId).toBe(1);
    expect(debt.nationalId).toBe('1203894569');
    expect(debt.description).toBe('Test Debt');
    expect(debt.descriptionSecondary).toBe('Additional Info');
    expect(debt.loanType).toBe('property');
    expect(debt.lenderId).toBe('4910080160');
    expect(debt.loanNumber).toBe('12345');
    expect(debt.loanDate).toEqual(new Date('2023-01-01'));
    expect(debt.loanLength).toBe('30');
    expect(debt.totalPayment).toBe(2000000);
    expect(debt.principalPayment).toBe(1000000);
    expect(debt.deduction).toBe(0);
    expect(debt.totalCost).toBe(1000000);
    expect(debt.amount).toBe(20000000);
  });

  it('should handle nullable properties correctly', () => {
    const debt = new Debt();
    debt.id = 1;
    debt.applicationId = 1;
    debt.nationalId = '1203894569';
    
    expect(debt.id).toBe(1);
    expect(debt.applicationId).toBe(1);
    expect(debt.nationalId).toBe('1203894569');
    expect(debt.description).toBeUndefined();
    expect(debt.descriptionSecondary).toBeUndefined();
    expect(debt.loanType).toBeUndefined();
  });

  it('should properly set relationship properties', () => {
    const debt = new Debt();
    const application = new Application();
    const entity = new Entity();
    const lender = new Entity();
    
    debt.application = application;
    debt.entity = entity;
    debt.lender = lender;
    
    expect(debt.application).toBe(application);
    expect(debt.entity).toBe(entity);
    expect(debt.lender).toBe(lender);
  });

  it('should work with mock factory', () => {
    const mockDebt = createMockDebt();
    
    expect(mockDebt).toBeInstanceOf(Object);
    expect(mockDebt.id).toBe(1);
    expect(mockDebt.applicationId).toBe(1);
    expect(mockDebt.nationalId).toBe('1203894569');
    expect(mockDebt.description).toBe('Test Debt');
    expect(mockDebt.loanType).toBe('property');
    expect(mockDebt.amount).toBe(20000000);
    
    // Test with overrides
    const overrideDebt = createMockDebt({ 
      id: 999, 
      amount: 5000000,
      loanType: 'vehicle',
      loanNumber: 'XYZ-789'
    });
    
    expect(overrideDebt.id).toBe(999);
    expect(overrideDebt.amount).toBe(5000000);
    expect(overrideDebt.loanType).toBe('vehicle');
    expect(overrideDebt.loanNumber).toBe('XYZ-789');
    expect(overrideDebt.nationalId).toBe('1203894569'); // Default value remains
  });
});