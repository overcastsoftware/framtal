# NestJS GraphQL API for Framtal Database

This is a GraphQL API built with NestJS that connects to the Framtal PostgreSQL database.

## Technologies Used

- NestJS
- GraphQL (Apollo Server)
- TypeORM
- PostgreSQL

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Running the Application

1. Clone the repository
2. Navigate to the project directory
3. Run the following command to start the application:

```bash
docker-compose up
```

This will start both the PostgreSQL database and the NestJS GraphQL API.

4. Once the application is running, you can access the GraphQL playground at [http://localhost:3000/graphql](http://localhost:3000/graphql)

## API Structure

The API is organized around the following entities:

- **Application**: Represents a tax application
- **Entity**: Represents a person or organization
- **Asset**: Represents an asset owned by an entity
- **Debt**: Represents a debt owned by an entity
- **Income**: Represents income received by an entity

## Example Queries

### Get all applications

```graphql
query {
  applications {
    id
    familyNumber
    year
  }
}
```

### Get an application by ID with related data

```graphql
query {
  application(id: 1) {
    id
    familyNumber
    year
    assets {
      id
      description
      amount
      assetType
    }
    debts {
      id
      description
      amount
      loanType
    }
    incomes {
      id
      amount
      incomeType
      payor {
        name
      }
    }
  }
}
```

### Get entities by family number

```graphql
query {
  entitiesByFamily(familyNumber: "1203894569") {
    nationalId
    name
    address
    email
    phone
  }
}
```

## Project Structure

- `src/models`: TypeORM entity models that correspond to database tables
- `src/config`: Configuration files for the application
- `src/graphql`: GraphQL schema and types
- `src/{entity-name}`: Modules for each entity with resolvers and services