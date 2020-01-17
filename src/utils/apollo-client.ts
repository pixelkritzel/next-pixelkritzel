import ApolloClient from 'apollo-boost';
import fetch from 'node-fetch';
export const client = new ApolloClient({
  fetch: fetch as any,
  uri: `${process.env.CONTENT_SERVER}/graphql`
});
