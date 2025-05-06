import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationResolver } from './application.resolver';
import { ApplicationService } from './application.service';
import { createMockApplication } from '../test/test-utils';

describe('ApplicationResolver', () => {
  let resolver: ApplicationResolver;
  let mockApplicationService;

  beforeEach(async () => {
    mockApplicationService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      findByFamilyNumber: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationResolver,
        {
          provide: ApplicationService,
          useValue: mockApplicationService,
        },
      ],
    }).compile();

    resolver = module.get<ApplicationResolver>(ApplicationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('applications', () => {
    it('should return an array of applications', async () => {
      const mockApplications = [createMockApplication(), createMockApplication({ id: 2 })];
      mockApplicationService.findAll.mockResolvedValue(mockApplications);

      const result = await resolver.applications();

      expect(result).toEqual(mockApplications);
      expect(mockApplicationService.findAll).toHaveBeenCalled();
    });
  });

  describe('application', () => {
    it('should return a single application by id', async () => {
      const mockApplication = createMockApplication();
      mockApplicationService.findOne.mockResolvedValue(mockApplication);

      const result = await resolver.application(1);

      expect(result).toEqual(mockApplication);
      expect(mockApplicationService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('applicationsByFamilyNumber', () => {
    it('should return applications by family number', async () => {
      const familyNumber = '1203894569';
      const mockApplications = [createMockApplication({ familyNumber })];
      mockApplicationService.findByFamilyNumber.mockResolvedValue(mockApplications);

      const result = await resolver.applicationsByFamilyNumber(familyNumber);

      expect(result).toEqual(mockApplications);
      expect(mockApplicationService.findByFamilyNumber).toHaveBeenCalledWith(familyNumber);
    });
  });
});