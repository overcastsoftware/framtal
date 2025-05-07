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
      description
      loanType
      amount
      totalCost
    }
    incomes {
      id
      amount
      incomeType
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