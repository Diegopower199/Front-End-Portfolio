import { ApolloClient, InMemoryCache } from "@apollo/client";

export const clientCSR = new ApolloClient({
  uri: "http://localhost:7777/",
  cache: new InMemoryCache(),
});

export const getClientSSR = () =>
  new ApolloClient({
    uri: "http://back:7777/",
    cache: new InMemoryCache(),
  });
