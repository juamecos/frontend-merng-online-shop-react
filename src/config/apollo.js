import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { getToken, isAuthenticated } from '../utils/token';

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  // if there is a token in localStorage and is valid, use token in request header
  // if is it not valid token, remove token and do not use token in request header
  // if there is no token, do not use token in request header
  // in routes.js -> only possible to visualize Active page if the user is VIEWER, not ADMIN or CLIENT
  return isAuthenticated(token)
    ? {
        headers: {
          Authorization: token ? `${token}` : '',
        },
      }
    : null;
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('GraphQL Errors', graphQLErrors);
  }
  if (networkError) {
    console.log('Network Errors', networkError);
  }
});

const http = createHttpLink({
  uri: 'http://localhost:2002/graphql',
});

const client = new ApolloClient({
  connectToDevTools: true,
  link: errorLink.concat(authLink).concat(http),
  cache: new InMemoryCache({
    typePolicies: {},
  }),
});

export default client;
