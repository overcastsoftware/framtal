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

![island is db schema](https://github.com/user-attachments/assets/44265f2d-007d-4bb0-b325-c52e05cf6532)
