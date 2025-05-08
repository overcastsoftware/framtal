import { gql } from '@apollo/client';

export const CREATE_INCOME = gql`
  mutation CreateIncome($input: CreateIncomeInput!) {
    createIncome(createIncomeInput: $input) {
      id
      nationalId
      amount
      incomeType
      payorId
      payor {
        name
        nationalId
      }
    }
  }
`;

export const UPDATE_INCOME = gql`
  mutation UpdateIncome($input: UpdateIncomeInput!) {
    updateIncome(updateIncomeInput: $input) {
      id
      amount
      incomeType
      payorId
      payor {
        name
        nationalId
      }
    }
  }
`;

export const DELETE_INCOME = gql`
  mutation DeleteIncome($id: Int!) {
    deleteIncome(id: $id)
  }
`;