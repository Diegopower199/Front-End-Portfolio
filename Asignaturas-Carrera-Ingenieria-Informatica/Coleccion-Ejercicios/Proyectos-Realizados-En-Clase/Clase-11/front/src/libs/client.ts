import { ApolloClient, InMemoryCache } from "@apollo/client";

const CSRClient = new ApolloClient({
  uri: "http://localhost:8080",
  cache: new InMemoryCache(),
});

const getClient = () => {
  if (typeof window === undefined) {
    return new ApolloClient({
      uri: "https://rickandmortyapi.com/graphql",
      cache: new InMemoryCache(),
    });
  } else {
    return CSRClient;
  }
};

export default getClient;
