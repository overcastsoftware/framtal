import { Test, TestingModule } from '@nestjs/testing';
import { DebtResolver } from './debt.resolver';
import { DebtService } from './debt.service';
import { createMockDebt } from '../test/test-utils';
import { CreateDebtInput } from '../graphql/dto/create-debt.input';
import { UpdateDebtInput } from '../graphql/dto/update-debt.input';

describe('DebtResolver', () => {
  let resolver: DebtResolver;
  let mockDebtService;

  beforeEach(async () => {
    mockDebtService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      findByApplicationId: jest.fn(),
      findByNationalId: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DebtResolver,
        {
          provide: DebtService,
          useValue: mockDebtService,
        },
      ],
    }).compile();

    resolver = module.get<DebtResolver>(DebtResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('debts', () => {
    it('should return an array of debts', async () => {
      const mockDebts = [createMockDebt(), createMockDebt({ id: 2 })];
      mockDebtService.findAll.mockResolvedValue(mockDebts);

      const result = await resolver.debts();

      expect(result).toEqual(mockDebts);
      expect(mockDebtService.findAll).toHaveBeenCalled();
    });
  });

  describe('debt', () => {
    it('should return a single debt by id', async () => {
      const mockDebt = createMockDebt();
      mockDebtService.findOne.mockResolvedValue(mockDebt);

      const result = await resolver.debt(1);

      expect(result).toEqual(mockDebt);
      expect(mockDebtService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('debtsByApplication', () => {
    it('should return debts by application id', async () => {
      const applicationId = 1;
      const mockDebts = [
        createMockDebt({ applicationId }), 
        createMockDebt({ id: 2, applicationId })
      ];
      mockDebtService.findByApplicationId.mockResolvedValue(mockDebts);

      const result = await resolver.debtsByApplication(applicationId);

      expect(result).toEqual(mockDebts);
      expect(mockDebtService.findByApplicationId).toHaveBeenCalledWith(applicationId);
    });
  });

  describe('debtsByNationalId', () => {
    it('should return debts by national id', async () => {
      const nationalId = '1203894569';
      const mockDebts = [
        createMockDebt({ nationalId }), 
        createMockDebt({ id: 2, nationalId })
      ];
      mockDebtService.findByNationalId.mockResolvedValue(mockDebts);

      const result = await resolver.debtsByNationalId(nationalId);

      expect(result).toEqual(mockDebts);
      expect(mockDebtService.findByNationalId).toHaveBeenCalledWith(nationalId);
    });
  });

  describe('createDebt', () => {
    it('should create and return a new debt', async () => {
      const mockDebt = createMockDebt();
      const createDebtInput: CreateDebtInput = {
        applicationId: 1,
        nationalId: '1203894569',
        description: 'Test Debt',
        loanType: 'property',
        lenderId: '4910080160',
        amount: 20000000,
        totalCost: 1000000,
      };
      
      mockDebtService.create.mockResolvedValue(mockDebt);

      const result = await resolver.createDebt(createDebtInput);

      expect(result).toEqual(mockDebt);
      expect(mockDebtService.create).toHaveBeenCalledWith(createDebtInput);
    });
  });

  describe('updateDebt', () => {
    it('should update and return the updated debt', async () => {
      const mockDebt = createMockDebt({ description: 'Updated Debt', amount: 25000000 });
      const updateDebtInput: UpdateDebtInput = {
        id: 1,
        description: 'Updated Debt',
        amount: 25000000,
      };
      
      mockDebtService.update.mockResolvedValue(mockDebt);

      const result = await resolver.updateDebt(updateDebtInput);

      expect(result).toEqual(mockDebt);
      expect(mockDebtService.update).toHaveBeenCalledWith(updateDebtInput);
    });
  });

  describe('deleteDebt', () => {
    it('should delete a debt and return true when successful', async () => {
      mockDebtService.delete.mockResolvedValue(true);

      const result = await resolver.deleteDebt(1);

      expect(result).toBe(true);
      expect(mockDebtService.delete).toHaveBeenCalledWith(1);
    });

    it('should return false when debt deletion fails', async () => {
      mockDebtService.delete.mockResolvedValue(false);

      const result = await resolver.deleteDebt(999);

      expect(result).toBe(false);
      expect(mockDebtService.delete).toHaveBeenCalledWith(999);
    });
  });
});