import { createWithApollo } from './createWithApollo';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { PaginatedCards, PaginatedClients } from '../../generated/graphql';
import { NextPageContext } from 'next';

const client = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    credentials: 'include',
    headers: {
      cookie:
        (typeof window === 'undefined'
          ? ctx?.req?.headers.cookie
          : undefined) || '',
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          // fields: {
          //   cards: {
          //     keyArgs: [],
          //     merge(
          //       existing: PaginatedCards | undefined,
          //       incoming: PaginatedCards
          //     ): PaginatedCards {
          //       return {
          //         ...incoming,
          //         cards: [...(existing?.cards || []), ...incoming.cards],
          //       };
          //     },
          //   },
          //   clients: {
          //     keyArgs: [],
          //     merge(
          //       existing: PaginatedClients | undefined,
          //       incoming: PaginatedClients
          //     ): PaginatedClients {
          //       return {
          //         ...incoming,
          //         clients: [...(existing?.clients || []), ...incoming.clients],
          //       };
          //     },
          //   },
          // },
        },
      },
    }),
  });

export const withApollo = createWithApollo(client);
