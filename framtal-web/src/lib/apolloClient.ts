import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

// Custom fetch function with proper headers
const customFetch = (input: RequestInfo | URL, init?: RequestInit) => {
  const defaultOptions: RequestInit = {
    credentials: 'include', // This ensures cookies are sent with requests
    headers: {
      'Content-Type': 'application/json',
    },
    ...init
  };
  
  // Ensure we don't override headers completely, but merge them
  defaultOptions.headers = {
    ...defaultOptions.headers,
    ...(init?.headers || {}),
  };
  
  return fetch(input, defaultOptions);
};

// HTTP link to the GraphQL server through our Next.js proxy
const httpLink = new HttpLink({
  // Use the relative path that will be handled by our Next.js rewrites
  uri: '/api/graphql',
  credentials: 'same-origin', // Changed to same-origin since we're using a proxy
  fetch: customFetch,
});

// Apollo Client instance
export const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});