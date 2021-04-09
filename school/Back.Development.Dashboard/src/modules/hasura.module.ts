import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, concat } from "apollo-link";
import fetch from "isomorphic-unfetch";
export interface IGlobal {
  fetch: typeof fetch;
}
declare var window;

declare var global: IGlobal;

if (typeof window !== "undefined") {
  global.fetch = fetch;
}

const initApollo = <T>(
  { uri, headers }: { headers?: any; uri: string }, // @TODO: remove any
  initialState?: T
) => {
  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({ headers });

    return forward!(operation);
  });

  const httpLink = new HttpLink({
    uri,
    credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
  });

  return new ApolloClient({
    defaultOptions: {
      query: {
        fetchPolicy: "no-cache",
      },
      watchQuery: {
        fetchPolicy: "no-cache",
      },
    },
    connectToDevTools: typeof window !== "undefined",
    ssrMode: typeof window === "undefined", // Disables forceFetch on the server (so queries are only run once)
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache({addTypename: false}).restore(initialState || {}),
  
  });
};

const getClient = <T>(initialState?: T) => {
  return initApollo<T>(
    {
      uri: `${process.env.HASURA_ENDPOINT}/v1/graphql`,
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
      },
    },
    initialState
  );
};
const client = getClient();

export default client;
