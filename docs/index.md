# `framtal`

This is an application demonstrating how an individual would view, alter and finally submit their tax return for a given year in the Island.is ecosystem.

## Applications

This project contains two applications

* `framtal-api`
* `framtal-web`

These correspond to a backend API built with GraphQL and nestjs storing data in a PostgreSQL database, and a frontend application using React.js, next.js and a GraphQL client, respectively.

# Set up

This project is completely containerized using Docker. You need to have Docker installed. Then you can run:

`docker compose up`

The project will build the frontend, backend and db containers and seed the database with mock data.

# Database

The project uses PostgreSQL as the database. The schema is stored in the `public.sql` file. In a real world application the data models would be defined in code and run on the database as migrations. 

To reset the database, simply shut down the containers, delete the `db` container and rebuild:

```
docker compose down
docker compose rm db
docker compose up
```

## Database schema

![island is db schema](https://github.com/user-attachments/assets/44265f2d-007d-4bb0-b325-c52e05cf6532)


The database consists of 5 tables:

* `Entity`: A person or legal entity that has a national ID (kennitala). Individuals additionally can have a family number. A family number is used by the Registers Iceland to group individuals that belong to the same family. See more: https://www.skra.is/folk/eg-i-thjodskra/um-fjolskyldunumer/
  * In this project we use the family number to demonstrate that individuals that are taxed together will have the same tax return. 
* `Application`: A tax return application for a given family number. There will be a new application each year.
* `Asset`: This table contains all information about financial assets, such as real estate or vehicles. This table has the nationalId to assign a given income value to a certain individual with the family. Different assets are grouped using the `assetType` column.
* `Income`: This table contains all information about income, such as salary, benefits or grants. This table has the nationalId to assign a given income value to a certain individual with the family. It is possible to assign each income line to a certain payor using payorId, such as an employer or fund. Different assets are grouped using the `incomeType` column.
* `Debt`: This table contains all information about debt, such as loans, short term or long term, credit card loans etc. This table has the nationalId to assign a given debt value to a certain individual with the family. It is possible to assign each debt line to a certain lender using lenderId, such as a bank or pension fund. Different debt items are grouped using the `loanType` column.
* The `Asset`, `Income` and `Debt` tables reference the `Application` table via a foreign key relationship, so that joins can be made to pull up all data linked to an application.

# The backend API: `framtal-api`

The backend API is available at `http://localhost:3001/graphql`. The GraphQL implementation provides queries and mutations that can be used to fetch applications and alter them.

## Application operations

### Get an application with all the data needed for the frontpage of the application

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

## Income operations

### Create income

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

### Update income

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
}
```

### Delete income

```graphql
mutation {
  deleteIncome(id: 4)
}
```

## Asset operations

### Create asset

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

### Update assets

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
```

### Delete asset

```graphql
mutation {
  deleteAsset(id: 3)
}
```

## Debt operations

### Create debt

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

### Update debt

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

### Delete debt

```graphql
mutation {
  deleteDebt(id: 5)
}
```

