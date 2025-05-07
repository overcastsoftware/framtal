# Next.js with GraphQL Boilerplate

This is a boilerplate project integrating Next.js with GraphQL. It's configured to connect to a GraphQL endpoint at `localhost:3001/graphql` and automatically generate TypeScript types from your schema.

## Features

- Next.js 15 with App Router
- Apollo Client for GraphQL integration
- Automatic TypeScript type generation from GraphQL schema
- TailwindCSS for styling
- Example GraphQL query component

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## GraphQL Schema Generation

This project is set up to generate TypeScript types from your GraphQL schema at `localhost:3001/graphql`. To generate the types:

```bash
# Generate types once
npm run generate

# Generate types and watch for changes (recommended during development)
npm run dev:generate
```

Make sure your GraphQL server is running at `localhost:3001/graphql` before running these commands.

## Project Structure

- `src/app` - Next.js app directory
- `src/graphql/queries` - GraphQL query definitions
- `src/generated` - Auto-generated TypeScript types from GraphQL schema
- `src/lib` - Apollo Client configuration and providers

## Using GraphQL

1. Define your queries in `src/graphql/queries/`
2. Run `npm run generate` to generate TypeScript types
3. Import and use the generated hooks in your components

Example:

```tsx
import { useQuery } from '@apollo/client';
import { GET_HELLO } from '@/graphql/queries/exampleQueries';

function MyComponent() {
  const { loading, error, data } = useQuery(GET_HELLO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <div>{JSON.stringify(data)}</div>;
}
```

## Customizing GraphQL Endpoint

To change the GraphQL endpoint, modify the URI in `src/lib/apolloClient.ts`:

```ts
const httpLink = new HttpLink({
  uri: 'your-graphql-endpoint-here',
  credentials: 'same-origin',
});
```

Also update the schema in `codegen.ts`:

```ts
const config: CodegenConfig = {
  schema: 'your-graphql-endpoint-here',
  // ...
};
```
