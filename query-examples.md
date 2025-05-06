Get application by family number:

# Write your query or mutation here
query GetApplicationsByFamilyNumber {
  applicationsByFamilyNumber(familyNumber: "1203894569") {
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




mutation {
  updateIncome(updateIncomeInput: {
    id: 5,
    amount: 120000,
    incomeType: "job_education_grant"
  }) {
    id
    amount
    incomeType
    payor {
      nationalId
      # other fields you want to retrieve
    }
  }
}