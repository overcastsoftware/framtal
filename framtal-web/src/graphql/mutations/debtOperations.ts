import { gql } from '@apollo/client';

export const CREATE_DEBT = gql`
  mutation CreateDebt($input: CreateDebtInput!) {
    createDebt(createDebtInput: $input) {
      id
      nationalId
      amount
      applicationId
      deduction
      description
      descriptionSecondary
      loanDate
      loanLength
      loanNumber
      loanType
      nationalId
      principalPayment
      totalCost
      totalPayment
      lender {
        name
        nationalId
      }    }
  }
`;

export const UPDATE_DEBT = gql`
  mutation UpdateDebt($input: UpdateDebtInput!) {
    updateDebt(updateDebtInput: $input) {
      id
      amount
      applicationId
      deduction
      description
      descriptionSecondary
      loanDate
      loanLength
      loanNumber
      loanType
      nationalId
      principalPayment
      totalCost
      totalPayment
      lender {
        name
        nationalId
      }    }
  }
`;

export const DELETE_DEBT = gql`
  mutation DeleteDebt($id: Int!) {
    deleteDebt(id: $id)
  }
`;
