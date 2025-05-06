import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

describe('GraphQL API (e2e)', () => {
  let app: INestApplication;

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
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Query: applications', () => {
    it('should fetch all applications', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
          {
            applications {
              id
              familyNumber
              year
            }
          }
          `,
        })
        .expect(200)
        .expect(res => {
          expect(res.body.data).toBeDefined();
          expect(res.body.data.applications).toBeDefined();
          expect(Array.isArray(res.body.data.applications)).toBeTruthy();
        });
    });
  });

  describe('Query: applicationsByFamilyNumber', () => {
    it('should fetch applications by family number', () => {
      const familyNumber = '1203894569';
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
          {
            applicationsByFamilyNumber(familyNumber: "${familyNumber}") {
              id
              familyNumber
              year
              applicant {
                name
                nationalId
              }
              assets {
                id
                description
              }
              debts {
                id
                description
              }
              incomes {
                id
                amount
              }
            }
          }
          `,
        })
        .expect(200)
        .expect(res => {
          expect(res.body.data).toBeDefined();
          expect(res.body.data.applicationsByFamilyNumber).toBeDefined();
          expect(Array.isArray(res.body.data.applicationsByFamilyNumber)).toBeTruthy();
          if (res.body.data.applicationsByFamilyNumber.length > 0) {
            const app = res.body.data.applicationsByFamilyNumber[0];
            expect(app.familyNumber).toEqual(familyNumber);
            expect(app.applicant).toBeDefined();
          }
        });
    });
  });

  describe('Mutation: createAsset', () => {
    it('should create a new asset', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
          mutation {
            createAsset(createAssetInput: {
              applicationId: 1,
              nationalId: "1203894569",
              description: "Test Asset",
              amount: 100000,
              assetType: "vehicle",
              assetIdentifier: "TEST-123"
            }) {
              id
              description
              amount
              assetType
              assetIdentifier
              nationalId
            }
          }
          `,
        })
        .expect(200)
        .expect(res => {
          expect(res.body.data).toBeDefined();
          expect(res.body.data.createAsset).toBeDefined();
          expect(res.body.data.createAsset.description).toEqual('Test Asset');
          expect(res.body.data.createAsset.amount).toEqual(100000);
          expect(res.body.data.createAsset.assetType).toEqual('vehicle');
          expect(res.body.data.createAsset.assetIdentifier).toEqual('TEST-123');
        });
    });
  });

  describe('Mutation: createIncome', () => {
    it('should create a new income record', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
          mutation {
            createIncome(createIncomeInput: {
              applicationId: 1,
              nationalId: "1203894569",
              payorId: "5501119999",
              amount: 750000,
              incomeType: "bonus"
            }) {
              id
              nationalId
              payorId
              amount
              incomeType
            }
          }
          `,
        })
        .expect(200)
        .expect(res => {
          expect(res.body.data).toBeDefined();
          expect(res.body.data.createIncome).toBeDefined();
          expect(res.body.data.createIncome.nationalId).toEqual('1203894569');
          expect(res.body.data.createIncome.payorId).toEqual('5501119999');
          expect(res.body.data.createIncome.amount).toEqual(750000);
          expect(res.body.data.createIncome.incomeType).toEqual('bonus');
        });
    });
  });

  describe('Mutation: createDebt', () => {
    it('should create a new debt record', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
          mutation {
            createDebt(createDebtInput: {
              applicationId: 1,
              nationalId: "1203894569",
              description: "Test Loan",
              loanType: "student_loan",
              amount: 2500000,
              lenderId: "4910080160"
            }) {
              id
              nationalId
              description
              loanType
              amount
              lenderId
            }
          }
          `,
        })
        .expect(200)
        .expect(res => {
          expect(res.body.data).toBeDefined();
          expect(res.body.data.createDebt).toBeDefined();
          expect(res.body.data.createDebt.nationalId).toEqual('1203894569');
          expect(res.body.data.createDebt.description).toEqual('Test Loan');
          expect(res.body.data.createDebt.loanType).toEqual('student_loan');
          expect(res.body.data.createDebt.amount).toEqual(2500000);
          expect(res.body.data.createDebt.lenderId).toEqual('4910080160');
        });
    });
  });
});