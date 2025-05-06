Get application by family number:

# Write your query or mutation here
query GetApplicationsByFamilyNumber {
  applicationsByFamilyNumber(familyNumber: "1203894569") {
    id
    familyNumber
    year
    applicant {
      nationalId
      familyNumber
      name
      phone
      email
      address
      postalCode
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

mutation {
  updateAsset(updateAssetInput: {
    id: 3,
    amount: 500000,
    assetType: "real_estate",
    description: "Summer house"
  }) {
    id
    amount
    assetType
    description
    assetIdentifier
  }
}

mutation {
  updateDebt(updateDebtInput: {
    id: 3,
    amount: 850000,
    loanType: "other",
    description: "Refinanced loan",
    totalCost: 76000
  }) {
    id
    amount
    loanType
    description
    totalCost
    lender {
      name
      nationalId
    }
  }
}