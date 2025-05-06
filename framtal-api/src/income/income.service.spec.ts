import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IncomeService } from './income.service';
import { Income } from '../models/income.model';
import { createMockIncome, createMockRepository } from '../test/test-utils';
import { CreateIncomeInput } from '../graphql/dto/create-income.input';

describe('IncomeService', () => {
  let service: IncomeService;
  let mockIncomeRepository;

  beforeEach(async () => {
    mockIncomeRepository = createMockRepository();
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IncomeService,
        {
          provide: getRepositoryToken(Income),
          useValue: mockIncomeRepository,
        },
      ],
    }).compile();

    service = module.get<IncomeService>(IncomeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of incomes', async () => {
      const mockIncomes = [createMockIncome(), createMockIncome({ id: 2 })];
      mockIncomeRepository.find.mockResolvedValue(mockIncomes);

      const result = await service.findAll();
      
      expect(result).toEqual(mockIncomes);
      expect(mockIncomeRepository.find).toHaveBeenCalledWith({
        relations: ['entity', 'application', 'payor'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a single income by id', async () => {
      const mockIncome = createMockIncome();
      mockIncomeRepository.findOne.mockResolvedValue(mockIncome);

      const result = await service.findOne(1);
      
      expect(result).toEqual(mockIncome);
      expect(mockIncomeRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['entity', 'application', 'payor'],
      });
    });
  });

  describe('findByApplicationId', () => {
    it('should return incomes by application id', async () => {
      const mockIncomes = [
        createMockIncome({ applicationId: 1 }), 
        createMockIncome({ id: 2, applicationId: 1 })
      ];
      mockIncomeRepository.find.mockResolvedValue(mockIncomes);

      const result = await service.findByApplicationId(1);
      
      expect(result).toEqual(mockIncomes);
      expect(mockIncomeRepository.find).toHaveBeenCalledWith({
        where: { applicationId: 1 },
        relations: ['entity', 'application', 'payor'],
      });
    });
  });

  describe('findByNationalId', () => {
    it('should return incomes by national id', async () => {
      const nationalId = '1203894569';
      const mockIncomes = [
        createMockIncome({ nationalId }), 
        createMockIncome({ id: 2, nationalId })
      ];
      mockIncomeRepository.find.mockResolvedValue(mockIncomes);

      const result = await service.findByNationalId(nationalId);
      
      expect(result).toEqual(mockIncomes);
      expect(mockIncomeRepository.find).toHaveBeenCalledWith({
        where: { nationalId },
        relations: ['entity', 'application', 'payor'],
      });
    });
  });

  describe('findByPayorId', () => {
    it('should return incomes by payor id', async () => {
      const payorId = '5501119999';
      const mockIncomes = [
        createMockIncome({ payorId }), 
        createMockIncome({ id: 2, payorId })
      ];
      mockIncomeRepository.find.mockResolvedValue(mockIncomes);

      const result = await service.findByPayorId(payorId);
      
      expect(result).toEqual(mockIncomes);
      expect(mockIncomeRepository.find).toHaveBeenCalledWith({
        where: { payorId },
        relations: ['entity', 'application', 'payor'],
      });
    });
  });

  describe('create', () => {
    it('should create a new income entry', async () => {
      const mockIncome = createMockIncome();
      const createIncomeInput: CreateIncomeInput = {
        applicationId: 1,
        nationalId: '1203894569',
        payorId: '5501119999',
        amount: 450000,
        incomeType: 'salary',
      };
      
      mockIncomeRepository.create.mockReturnValue(mockIncome);
      mockIncomeRepository.save.mockResolvedValue(mockIncome);
      mockIncomeRepository.findOne.mockResolvedValue(mockIncome);

      const result = await service.create(createIncomeInput);
      
      expect(mockIncomeRepository.create).toHaveBeenCalledWith(createIncomeInput);
      expect(mockIncomeRepository.save).toHaveBeenCalledWith(mockIncome);
      expect(mockIncomeRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockIncome.id },
        relations: ['entity', 'application', 'payor'],
      });
      expect(result).toEqual(mockIncome);
    });
  });

  describe('updateIncome', () => {
    it('should update an income entry', async () => {
      const id = 1;
      const mockIncome = createMockIncome({ amount: 500000, incomeType: 'bonus' });
      const updateData = {
        amount: 500000,
        incomeType: 'bonus',
      };
      
      mockIncomeRepository.update.mockResolvedValue({ affected: 1 });
      mockIncomeRepository.findOne.mockResolvedValue(mockIncome);

      const result = await service.updateIncome(id, updateData);
      
      expect(mockIncomeRepository.update).toHaveBeenCalledWith(id, updateData);
      expect(mockIncomeRepository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: ['entity', 'application', 'payor'],
      });
      expect(result).toEqual(mockIncome);
    });
  });

  describe('delete', () => {
    it('should delete an income entry', async () => {
      mockIncomeRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.delete(1);
      
      expect(mockIncomeRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });

    it('should return false if income not found', async () => {
      mockIncomeRepository.delete.mockResolvedValue({ affected: 0 });

      const result = await service.delete(999);
      
      expect(mockIncomeRepository.delete).toHaveBeenCalledWith(999);
      expect(result).toBe(false);
    });
  });
});