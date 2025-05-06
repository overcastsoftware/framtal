import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

/**
 * Helper class to simplify testing GraphQL operations
 */
export class GraphQLTestClient {
  constructor(private readonly app: INestApplication) {}

  /**
   * Execute a GraphQL query
   */
  async query<T = any>(query: string, variables?: Record<string, any>): Promise<T> {
    const response = await request(this.app.getHttpServer())
      .post('/graphql')
      .send({
        query,
        variables
      });

    if (response.body.errors) {
      throw new Error(`GraphQL query error: ${JSON.stringify(response.body.errors)}`);
    }

    return response.body.data as T;
  }

  /**
   * Execute a GraphQL mutation
   */
  async mutate<T = any>(mutation: string, variables?: Record<string, any>): Promise<T> {
    return this.query<T>(mutation, variables);
  }

  /**
   * Test helpers for common queries
   */
  async getApplicationsByFamilyNumber(familyNumber: string) {
    const query = `
      query GetApplications($familyNumber: String!) {
        applicationsByFamilyNumber(familyNumber: $familyNumber) {
          id
          familyNumber
          year
          applicant {
            nationalId
            familyNumber
            name
            phone
            email
          }
          assets {
            id
            description
            amount
            assetType
            assetIdentifier
          }
          debts {
            id
            amount
            description
            loanType
            lender {
              name
              nationalId
            }
          }
          incomes {
            id
            amount
            incomeType
            payor {
              name
              nationalId
            }
          }
        }
      }
    `;
    
    return this.query(query, { familyNumber });
  }

  /**
   * Create an asset with the given input data
   */
  async createAsset(createAssetInput: {
    applicationId: number;
    nationalId: string;
    description?: string;
    amount?: number;
    assetType?: string;
    assetIdentifier?: string;
  }) {
    const mutation = `
      mutation CreateAsset($input: CreateAssetInput!) {
        createAsset(createAssetInput: $input) {
          id
          nationalId
          description
          amount
          assetType
          assetIdentifier
        }
      }
    `;
    
    return this.mutate(mutation, { input: createAssetInput });
  }

  /**
   * Create an income entry with the given input data
   */
  async createIncome(createIncomeInput: {
    applicationId: number;
    nationalId: string;
    payorId: string;
    amount?: number;
    incomeType?: string;
  }) {
    const mutation = `
      mutation CreateIncome($input: CreateIncomeInput!) {
        createIncome(createIncomeInput: $input) {
          id
          nationalId
          payorId
          amount
          incomeType
          payor {
            name
            nationalId
          }
        }
      }
    `;
    
    return this.mutate(mutation, { input: createIncomeInput });
  }

  /**
   * Create a debt record with the given input data
   */
  async createDebt(createDebtInput: {
    applicationId: number;
    nationalId: string;
    description?: string;
    amount?: number;
    loanType?: string;
    lenderId?: string;
    loanNumber?: string;
    loanDate?: Date;
    totalCost?: number;
  }) {
    const mutation = `
      mutation CreateDebt($input: CreateDebtInput!) {
        createDebt(createDebtInput: $input) {
          id
          nationalId
          description
          amount
          loanType
          lenderId
          lender {
            name
            nationalId
          }
        }
      }
    `;
    
    return this.mutate(mutation, { input: createDebtInput });
  }
}