import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DebtService } from './debt.service';
import { Debt } from '../models/debt.model';
import { createMockDebt, createMockRepository } from '../test/test-utils';
import { CreateDebtInput } from '../graphql/dto/create-debt.input';
import { UpdateDebtInput } from '../graphql/dto/update-debt.input';

describe('DebtService', () => {
  let service: DebtService;
  let mockDebtRepository;

  beforeEach(async () => {
    mockDebtRepository = createMockRepository();
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DebtService,
        {
          provide: getRepositoryToken(Debt),
          useValue: mockDebtRepository,
        },
      ],
    }).compile();

    service = module.get<DebtService>(DebtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of debts', async () => {
      const mockDebts = [createMockDebt(), createMockDebt({ id: 2 })];
      mockDebtRepository.find.mockResolvedValue(mockDebts);

      const result = await service.findAll();
      
      expect(result).toEqual(mockDebts);
      expect(mockDebtRepository.find).toHaveBeenCalledWith({
        relations: ['entity', 'application'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a single debt by id', async () => {
      const mockDebt = createMockDebt();
      mockDebtRepository.findOne.mockResolvedValue(mockDebt);

      const result = await service.findOne(1);
      
      expect(result).toEqual(mockDebt);
      expect(mockDebtRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['entity', 'application', 'lender'],
      });
    });
  });

  describe('findByApplicationId', () => {
    it('should return debts by application id', async () => {
      const mockDebts = [
        createMockDebt({ applicationId: 1 }), 
        createMockDebt({ id: 2, applicationId: 1 })
      ];
      mockDebtRepository.find.mockResolvedValue(mockDebts);

      const result = await service.findByApplicationId(1);
      
      expect(result).toEqual(mockDebts);
      expect(mockDebtRepository.find).toHaveBeenCalledWith({
        where: { applicationId: 1 },
        relations: ['entity', 'application', 'lender'],
      });
    });
  });

  describe('findByNationalId', () => {
    it('should return debts by national id', async () => {
      const nationalId = '1203894569';
      const mockDebts = [
        createMockDebt({ nationalId }), 
        createMockDebt({ id: 2, nationalId })
      ];
      mockDebtRepository.find.mockResolvedValue(mockDebts);

      const result = await service.findByNationalId(nationalId);
      
      expect(result).toEqual(mockDebts);
      expect(mockDebtRepository.find).toHaveBeenCalledWith({
        where: { nationalId },
        relations: ['entity', 'application', 'lender'],
      });
    });
  });

  describe('create', () => {
    it('should create a new debt', async () => {
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
      
      mockDebtRepository.create.mockReturnValue(mockDebt);
      mockDebtRepository.save.mockResolvedValue(mockDebt);
      mockDebtRepository.findOne.mockResolvedValue(mockDebt);

      const result = await service.create(createDebtInput);
      
      expect(mockDebtRepository.create).toHaveBeenCalledWith(createDebtInput);
      expect(mockDebtRepository.save).toHaveBeenCalledWith(mockDebt);
      expect(mockDebtRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockDebt.id },
        relations: ['entity', 'application', 'lender'],
      });
      expect(result).toEqual(mockDebt);
    });
  });

  describe('update', () => {
    it('should update a debt', async () => {
      const mockDebt = createMockDebt({ description: 'Updated Debt', amount: 25000000 });
      const updateDebtInput: UpdateDebtInput = {
        id: 1,
        description: 'Updated Debt',
        amount: 25000000,
      };
      
      mockDebtRepository.update.mockResolvedValue({ affected: 1 });
      mockDebtRepository.findOne.mockResolvedValue(mockDebt);

      const result = await service.update(updateDebtInput);
      
      expect(mockDebtRepository.update).toHaveBeenCalledWith(
        updateDebtInput.id, 
        { description: 'Updated Debt', amount: 25000000 }
      );
      expect(mockDebtRepository.findOne).toHaveBeenCalledWith({
        where: { id: updateDebtInput.id },
        relations: ['entity', 'application', 'lender'],
      });
      expect(result).toEqual(mockDebt);
    });
  });

  describe('delete', () => {
    it('should delete a debt', async () => {
      mockDebtRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.delete(1);
      
      expect(mockDebtRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });

    it('should return false if debt not found', async () => {
      mockDebtRepository.delete.mockResolvedValue({ affected: 0 });

      const result = await service.delete(999);
      
      expect(mockDebtRepository.delete).toHaveBeenCalledWith(999);
      expect(result).toBe(false);
    });
  });
});