import { Test, TestingModule } from '@nestjs/testing';
import { IncomeResolver } from './income.resolver';
import { IncomeService } from './income.service';
import { createMockIncome } from '../test/test-utils';
import { CreateIncomeInput } from '../graphql/dto';
import { UpdateIncomeInput } from '../graphql/dto';

describe('IncomeResolver', () => {
  let resolver: IncomeResolver;
  let mockIncomeService;

  beforeEach(async () => {
    mockIncomeService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      findByApplicationId: jest.fn(),
      findByNationalId: jest.fn(),
      findByPayorId: jest.fn(),
      updateIncome: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IncomeResolver,
        {
          provide: IncomeService,
          useValue: mockIncomeService,
        },
      ],
    }).compile();

    resolver = module.get<IncomeResolver>(IncomeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('incomes', () => {
    it('should return an array of incomes', async () => {
      const mockIncomes = [createMockIncome(), createMockIncome({ id: 2 })];
      mockIncomeService.findAll.mockResolvedValue(mockIncomes);

      const result = await resolver.incomes();

      expect(result).toEqual(mockIncomes);
      expect(mockIncomeService.findAll).toHaveBeenCalled();
    });
  });

  describe('income', () => {
    it('should return a single income by id', async () => {
      const mockIncome = createMockIncome();
      mockIncomeService.findOne.mockResolvedValue(mockIncome);

      const result = await resolver.income(1);

      expect(result).toEqual(mockIncome);
      expect(mockIncomeService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('incomesByApplication', () => {
    it('should return incomes by application id', async () => {
      const applicationId = 1;
      const mockIncomes = [
        createMockIncome({ applicationId }), 
        createMockIncome({ id: 2, applicationId })
      ];
      mockIncomeService.findByApplicationId.mockResolvedValue(mockIncomes);

      const result = await resolver.incomesByApplication(applicationId);

      expect(result).toEqual(mockIncomes);
      expect(mockIncomeService.findByApplicationId).toHaveBeenCalledWith(applicationId);
    });
  });

  describe('incomesByNationalId', () => {
    it('should return incomes by national id', async () => {
      const nationalId = '1203894569';
      const mockIncomes = [
        createMockIncome({ nationalId }), 
        createMockIncome({ id: 2, nationalId })
      ];
      mockIncomeService.findByNationalId.mockResolvedValue(mockIncomes);

      const result = await resolver.incomesByNationalId(nationalId);

      expect(result).toEqual(mockIncomes);
      expect(mockIncomeService.findByNationalId).toHaveBeenCalledWith(nationalId);
    });
  });

  describe('incomesByPayor', () => {
    it('should return incomes by payor id', async () => {
      const payorId = '5501119999';
      const mockIncomes = [
        createMockIncome({ payorId }), 
        createMockIncome({ id: 2, payorId })
      ];
      mockIncomeService.findByPayorId.mockResolvedValue(mockIncomes);

      const result = await resolver.incomesByPayor(payorId);

      expect(result).toEqual(mockIncomes);
      expect(mockIncomeService.findByPayorId).toHaveBeenCalledWith(payorId);
    });
  });

  describe('createIncome', () => {
    it('should create and return a new income entry', async () => {
      const mockIncome = createMockIncome();
      const createIncomeInput: CreateIncomeInput = {
        applicationId: 1,
        nationalId: '1203894569',
        payorId: '5501119999',
        amount: 450000,
        incomeType: 'salary',
      };
      
      mockIncomeService.create.mockResolvedValue(mockIncome);

      const result = await resolver.createIncome(createIncomeInput);

      expect(result).toEqual(mockIncome);
      expect(mockIncomeService.create).toHaveBeenCalledWith(createIncomeInput);
    });
  });

  describe('updateIncome', () => {
    it('should update and return the updated income entry', async () => {
      const mockIncome = createMockIncome({ amount: 500000, incomeType: 'bonus' });
      const updateIncomeInput: UpdateIncomeInput = {
        id: 1,
        amount: 500000,
        incomeType: 'bonus',
      };
      
      mockIncomeService.updateIncome.mockResolvedValue(mockIncome);

      const result = await resolver.updateIncome(updateIncomeInput);

      expect(result).toEqual(mockIncome);
      expect(mockIncomeService.updateIncome).toHaveBeenCalledWith(
        updateIncomeInput.id,
        { amount: 500000, incomeType: 'bonus' }
      );
    });
  });

  describe('deleteIncome', () => {
    it('should delete an income entry and return true when successful', async () => {
      mockIncomeService.delete.mockResolvedValue(true);

      const result = await resolver.deleteIncome(1);

      expect(result).toBe(true);
      expect(mockIncomeService.delete).toHaveBeenCalledWith(1);
    });

    it('should return false when income deletion fails', async () => {
      mockIncomeService.delete.mockResolvedValue(false);

      const result = await resolver.deleteIncome(999);

      expect(result).toBe(false);
      expect(mockIncomeService.delete).toHaveBeenCalledWith(999);
    });
  });
});