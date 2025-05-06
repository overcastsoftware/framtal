import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ApplicationService } from './application.service';
import { Application } from '../models/application.model';
import { createMockApplication, createMockAsset, createMockDebt, createMockIncome, createMockRepository } from '../test/test-utils';

describe('ApplicationService', () => {
  let service: ApplicationService;
  let mockApplicationRepository;

  beforeEach(async () => {
    mockApplicationRepository = createMockRepository();
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationService,
        {
          provide: getRepositoryToken(Application),
          useValue: mockApplicationRepository,
        },
      ],
    }).compile();

    service = module.get<ApplicationService>(ApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of applications', async () => {
      const mockApplications = [createMockApplication(), createMockApplication({ id: 2 })];
      mockApplicationRepository.find.mockResolvedValue(mockApplications);

      const result = await service.findAll();
      
      expect(result).toEqual(mockApplications);
      expect(mockApplicationRepository.find).toHaveBeenCalledWith({
        relations: ['applicant']
      });
    });
  });

  describe('findOne', () => {
    it('should return a single application with all related entities', async () => {
      const mockAssets = [
        createMockAsset({ id: 1 }),
        createMockAsset({ id: 2, description: 'Second asset' })
      ];
      const mockDebts = [
        createMockDebt({ id: 1 }),
        createMockDebt({ id: 2, description: 'Second debt' })
      ];
      const mockIncomes = [
        createMockIncome({ id: 1 }),
        createMockIncome({ id: 2, amount: 350000 })
      ];
      
      const mockApplication = createMockApplication({
        assets: mockAssets,
        debts: mockDebts,
        incomes: mockIncomes
      });
      
      mockApplicationRepository.findOne.mockResolvedValue(mockApplication);

      const result = await service.findOne(1);
      
      expect(result).toEqual(mockApplication);
      expect(mockApplicationRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: {
          applicant: true,
          assets: true,
          debts: {
            lender: true
          },
          incomes: {
            payor: true
          }
        }
      });
      
      // Verify that all related entities were loaded
      expect(result.assets).toHaveLength(2);
      expect(result.debts).toHaveLength(2);
      expect(result.incomes).toHaveLength(2);
    });
  });

  describe('findByFamilyNumber', () => {
    it('should return applications by family number with all related entities', async () => {
      const familyNumber = '1203894569';
      const mockAssets = [createMockAsset({ id: 1 })];
      const mockDebts = [createMockDebt({ id: 1 })];
      const mockIncomes = [createMockIncome({ id: 1 })];
      
      const mockApplications = [createMockApplication({
        familyNumber,
        assets: mockAssets,
        debts: mockDebts,
        incomes: mockIncomes
      })];
      
      mockApplicationRepository.find.mockResolvedValue(mockApplications);

      const result = await service.findByFamilyNumber(familyNumber);
      
      expect(result).toEqual(mockApplications);
      expect(mockApplicationRepository.find).toHaveBeenCalledWith({
        where: { familyNumber },
        relations: {
          applicant: true,
          assets: true,
          debts: {
            lender: true
          },
          incomes: {
            payor: true
          }
        }
      });
      
      // Verify that all related entities were loaded
      expect(result[0].familyNumber).toEqual(familyNumber);
      expect(result[0].assets).toHaveLength(1);
      expect(result[0].debts).toHaveLength(1);
      expect(result[0].incomes).toHaveLength(1);
    });
  });
});