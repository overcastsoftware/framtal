import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GraphQLTestClient } from './graphql-test-helpers';

/**
 * This E2E test suite tests a complete tax application workflow:
 * 1. Query for application details
 * 2. Add a new asset to the application
 * 3. Add a new income source
 * 4. Add a new debt
 * 5. Query the updated application to verify changes
 */
describe('Application Workflow (e2e)', () => {
  let app: INestApplication;
  let gqlClient: GraphQLTestClient;
  
  // Test data constants
  const TEST_FAMILY_NUMBER = '1203894569';
  const TEST_NATIONAL_ID = '1203894569';
  let applicationId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DATABASE_HOST || 'localhost',
          port: parseInt(process.env.DATABASE_PORT || '5432'),
          username: process.env.DATABASE_USER || 'postgres',
          password: process.env.DATABASE_PASSWORD || 'framtal',
          database: process.env.DATABASE_NAME || 'framtal_test',
          entities: [join(__dirname, '..', 'src', 'models', '*.model.{ts,js}')],
          synchronize: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: true,
          sortSchema: true,
        }),
        AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    
    // Initialize the GraphQL test client
    gqlClient = new GraphQLTestClient(app);
  });

  afterAll(async () => {
    await app.close();
  });

  // Step 1: Query the current application
  it('should fetch application data for a family', async () => {
    const response = await gqlClient.getApplicationsByFamilyNumber(TEST_FAMILY_NUMBER);
    
    expect(response).toBeDefined();
    expect(response.applicationsByFamilyNumber).toBeDefined();
    expect(response.applicationsByFamilyNumber.length).toBeGreaterThan(0);
    
    // Store application ID for future steps
    applicationId = response.applicationsByFamilyNumber[0].id;
    
    // Validate existing application data
    const application = response.applicationsByFamilyNumber[0];
    expect(application.familyNumber).toEqual(TEST_FAMILY_NUMBER);
    expect(application.applicant).toBeDefined();
    expect(application.applicant.nationalId).toEqual(TEST_NATIONAL_ID);
    
    // Log the initial counts for comparison later
    console.log(`Initial assets: ${application.assets?.length || 0}`);
    console.log(`Initial incomes: ${application.incomes?.length || 0}`);
    console.log(`Initial debts: ${application.debts?.length || 0}`);
  });

  // Step 2: Add a new asset
  it('should add a new asset to the application', async () => {
    const createAssetInput = {
      applicationId,
      nationalId: TEST_NATIONAL_ID,
      description: 'E2E Test Asset',
      amount: 450000,
      assetType: 'vehicle',
      assetIdentifier: 'E2E-123'
    };
    
    const response = await gqlClient.createAsset(createAssetInput);
    
    expect(response).toBeDefined();
    expect(response.createAsset).toBeDefined();
    expect(response.createAsset.id).toBeDefined();
    expect(response.createAsset.description).toEqual(createAssetInput.description);
    expect(response.createAsset.amount).toEqual(createAssetInput.amount);
    expect(response.createAsset.assetType).toEqual(createAssetInput.assetType);
    expect(response.createAsset.assetIdentifier).toEqual(createAssetInput.assetIdentifier);
  });

  // Step 3: Add a new income source
  it('should add a new income source to the application', async () => {
    const createIncomeInput = {
      applicationId,
      nationalId: TEST_NATIONAL_ID,
      payorId: '5501119999', // Norðurljós Software ehf.
      amount: 850000,
      incomeType: 'e2e_test_bonus'
    };
    
    const response = await gqlClient.createIncome(createIncomeInput);
    
    expect(response).toBeDefined();
    expect(response.createIncome).toBeDefined();
    expect(response.createIncome.id).toBeDefined();
    expect(response.createIncome.amount).toEqual(createIncomeInput.amount);
    expect(response.createIncome.incomeType).toEqual(createIncomeInput.incomeType);
    expect(response.createIncome.payorId).toEqual(createIncomeInput.payorId);
  });

  // Step 4: Add a new debt
  it('should add a new debt to the application', async () => {
    const createDebtInput = {
      applicationId,
      nationalId: TEST_NATIONAL_ID,
      description: 'E2E Test Loan',
      loanType: 'e2e_test_loan',
      amount: 1500000,
      lenderId: '4910080160', // Íslandsbanki hf.
      totalCost: 150000
    };
    
    const response = await gqlClient.createDebt(createDebtInput);
    
    expect(response).toBeDefined();
    expect(response.createDebt).toBeDefined();
    expect(response.createDebt.id).toBeDefined();
    expect(response.createDebt.description).toEqual(createDebtInput.description);
    expect(response.createDebt.loanType).toEqual(createDebtInput.loanType);
    expect(response.createDebt.amount).toEqual(createDebtInput.amount);
  });

  // Step 5: Query the application again to verify all changes were applied
  it('should show updated application with all added items', async () => {
    const response = await gqlClient.getApplicationsByFamilyNumber(TEST_FAMILY_NUMBER);
    
    expect(response).toBeDefined();
    expect(response.applicationsByFamilyNumber).toBeDefined();
    expect(response.applicationsByFamilyNumber.length).toBeGreaterThan(0);
    
    const application = response.applicationsByFamilyNumber[0];
    expect(application.id).toEqual(applicationId);
    
    // Check if our new records exist
    expect(application.assets).toBeDefined();
    expect(application.incomes).toBeDefined();
    expect(application.debts).toBeDefined();
    
    // Find the new asset we created
    const foundAsset = application.assets.find(a => a.description === 'E2E Test Asset' && a.assetIdentifier === 'E2E-123');
    expect(foundAsset).toBeDefined();
    expect(foundAsset.amount).toEqual(450000);
    
    // Find the new income we created
    const foundIncome = application.incomes.find(i => i.incomeType === 'e2e_test_bonus' && i.amount === 850000);
    expect(foundIncome).toBeDefined();
    expect(foundIncome.payor).toBeDefined();
    expect(foundIncome.payor.nationalId).toEqual('5501119999');
    
    // Find the new debt we created
    const foundDebt = application.debts.find(d => d.description === 'E2E Test Loan' && d.loanType === 'e2e_test_loan');
    expect(foundDebt).toBeDefined();
    expect(foundDebt.amount).toEqual(1500000);
    expect(foundDebt.lender).toBeDefined();
    expect(foundDebt.lender.nationalId).toEqual('4910080160');
    
    // Log the updated counts
    console.log(`Updated assets: ${application.assets.length}`);
    console.log(`Updated incomes: ${application.incomes.length}`);
    console.log(`Updated debts: ${application.debts.length}`);
  });
});