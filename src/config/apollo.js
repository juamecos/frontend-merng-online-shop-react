import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { getToken } from "../utils/token";

const authLink = setContext((_, { headers }) => {
  const token = getToken();

  return {
    headers: {
      ...headers,
      Authorization: token ? `${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log("GraphQL Errors", graphQLErrors);
  }
  if (networkError) {
    console.log("Network Errors", networkError);
  }
});

const http = createHttpLink({
  uri: "http://localhost:2002/graphql",
});

const client = new ApolloClient({
  connectToDevTools: true,
  link: errorLink.concat(authLink).concat(http),
  cache: new InMemoryCache(),
});

export default client;
