import { Repository } from 'typeorm';
import { Asset } from '../models/asset.model';
import { Debt } from '../models/debt.model';
import { Income } from '../models/income.model';
import { Entity } from '../models/entity.model';
import { Application } from '../models/application.model';

// Mock factory for Entity
export const createMockEntity = (overrides?: Partial<Entity>): Entity => ({
  nationalId: '1203894569',
  familyNumber: '1203894569',
  name: 'Test Person',
  address: 'Test Address',
  email: 'test@example.com',
  phone: '123-456-7890',
  postalCode: '123 City',
  assets: [],
  debts: [],
  incomes: [],
  paymentsIssued: [],
  ...overrides,
});

// Mock factory for Application
export const createMockApplication = (overrides?: Partial<Application>): Application => ({
  id: 1,
  familyNumber: '1203894569',
  year: '2024',
  assets: [],
  debts: [],
  incomes: [],
  applicant: createMockEntity(),
  ...overrides,
});

// Mock factory for Asset
export const createMockAsset = (overrides?: Partial<Asset>): Asset => ({
  id: 1,
  applicationId: 1,
  nationalId: '1203894569',
  description: 'Test Asset',
  amount: 100000,
  assetType: 'real_estate',
  assetIdentifier: 'TEST-1234',
  application: createMockApplication(),
  entity: createMockEntity(),
  ...overrides,
});

// Mock factory for Income
export const createMockIncome = (overrides?: Partial<Income>): Income => ({
  id: 1,
  applicationId: 1,
  nationalId: '1203894569',
  payorId: '5501119999',
  amount: 450000,
  incomeType: 'salary',
  application: createMockApplication(),
  entity: createMockEntity(),
  payor: createMockEntity({ nationalId: '5501119999', name: 'Test Company' }),
  ...overrides,
});

// Mock factory for Debt
export const createMockDebt = (overrides?: Partial<Debt>): Debt => ({
  id: 1,
  applicationId: 1,
  nationalId: '1203894569',
  description: 'Test Debt',
  descriptionSecondary: 'Additional Info',
  loanType: 'property',
  lenderId: '4910080160',
  loanNumber: '12345',
  loanDate: new Date('2023-01-01'),
  loanLength: '30',
  totalPayment: 2000000,
  principalPayment: 1000000,
  deduction: 0,
  totalCost: 1000000,
  amount: 20000000,
  application: createMockApplication(),
  entity: createMockEntity(),
  lender: createMockEntity({ nationalId: '4910080160', name: 'Test Bank' }),
  ...overrides,
});

// Mock repository factory
export type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

export const createMockRepository = <T>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});