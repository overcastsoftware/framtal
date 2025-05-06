Get application by family number
================================

```graphql
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
```

Update income
=============

```graphql
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
}```

Update assets
=============

```graphql
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

Update debt
===========

```graphql
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
```

Create asset
============

```graphql
mutation {
  createAsset(createAssetInput: {
    applicationId: 1,
    nationalId: "1203894569",
    description: "Summer Cottage",
    amount: 25000000,
    assetType: "real_estate",
    assetIdentifier: "420-1234"
  }) {
    id
    nationalId
    description
    amount
    assetType
  }
}
```


Create debt
============

```graphql
mutation {
  createDebt(createDebtInput: {
    applicationId: 1,
    nationalId: "1203894569",
    description: "Car Loan",
    amount: 3500000,
    loanType: "vehicle_loan",
    lenderId: "4910080160",
    totalCost: 350000
  }) {
    id
    description
    amount
    loanType
    lender {
      name
      nationalId
    }
  }
}
```

Create income
============

```graphql
mutation {
  createIncome(createIncomeInput: {
    applicationId: 1,
    nationalId: "1203894569",
    payorId: "5501119999",
    amount: 450000,
    incomeType: "bonus"
  }) {
    id
    amount
    incomeType
    payor {
      name
      nationalId
    }
  }
}
```

Delete asset
============

```graphql
mutation {
  deleteAsset(id: 3)
}
```

Delete debt
============

```graphql
mutation {
  deleteDebt(id: 5)
}
```

Delete income
============

```graphql
mutation {
  deleteIncome(id: 4)
}
```