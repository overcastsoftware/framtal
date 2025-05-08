import { gql } from '@apollo/client';

// Example query - update this to match the actual schema from your endpoint
export const GET_APPLICATIONS_BY_FAMILY_NUMBER = gql`
  query GetApplicationsByFamilyNumber($familyNumber: String!) {
  applicationsByFamilyNumber(familyNumber: $familyNumber) {
    id
    familyNumber
    year
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
      lenderId
      lender {
        name
        nationalId
      }
    }
    incomes {
      id
      amount
      incomeType
      payorId
      payor {
        name,
        nationalId
      }
    }
  }
}

`;

// Query to fetch the currently logged in user
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      nationalId
      familyNumber
      name
      phone
      email
      address
      postalCode
    }
  }
`;

// Example of a query with parameters
export const GET_ITEM_BY_ID = gql`
  query GetItemById($id: ID!) {
    item(id: $id) {
      id
      name
      description
    }
  }
`;


export const GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_INCOME = gql`
  query GetApplicationsByFamilyNumber($familyNumber: String!) {
  applicationsByFamilyNumber(familyNumber: $familyNumber) {
    id
    incomes {
      id
      amount
      incomeType
      payorId
      payor {
        name,
        nationalId
      }
    }
  }
}

`;


export const GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_ASSETS = gql`
  query GetApplicationsByFamilyNumber($familyNumber: String!) {
  applicationsByFamilyNumber(familyNumber: $familyNumber) {
    id
    assets {
      id
      description
      amount
      assetType
      assetIdentifier
    }
  }
}

`;


export const GET_APPLICATIONS_BY_FAMILY_NUMBER_ONLY_DEBT = gql`
  query GetApplicationsByFamilyNumber($familyNumber: String!) {
  applicationsByFamilyNumber(familyNumber: $familyNumber) {
    id
    debts {
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
      lenderId
      lender {
        name
        nationalId
      }
    }
  }
}

`;