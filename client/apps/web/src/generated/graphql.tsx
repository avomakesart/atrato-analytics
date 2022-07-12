import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Card = {
  __typename?: 'Card';
  cardNumber: Scalars['String'];
  cardProvider: Scalars['String'];
  clientId: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  cvv: Scalars['String'];
  expiryDate: Scalars['String'];
  id: Scalars['Float'];
  pin: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CardInput = {
  cardNumber: Scalars['String'];
  cardProvider: Scalars['String'];
  cvv: Scalars['String'];
  expiryDate: Scalars['String'];
  pin: Scalars['String'];
};

export type Client = {
  __typename?: 'Client';
  assignedAnalyst: Scalars['String'];
  birthDate: Scalars['String'];
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Float'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  secondLastName: Scalars['String'];
  secondName: Scalars['String'];
  status: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ClientInput = {
  assignedAnalyst: Scalars['String'];
  birthDate: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  secondLastName: Scalars['String'];
  secondName: Scalars['String'];
  status: Scalars['String'];
};

export type ClientUpdateInput = {
  birthDate: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  secondLastName: Scalars['String'];
  secondName: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCard: Card;
  createClient: Client;
  deleteCard: Scalars['String'];
  deleteClient: Scalars['String'];
  updateCard?: Maybe<Card>;
  updateClient?: Maybe<Client>;
  updateClientStatus?: Maybe<Client>;
};


export type MutationCreateCardArgs = {
  clientId: Scalars['Float'];
  input: CardInput;
};


export type MutationCreateClientArgs = {
  input: ClientInput;
};


export type MutationDeleteCardArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteClientArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateCardArgs = {
  id: Scalars['Int'];
  input: CardInput;
};


export type MutationUpdateClientArgs = {
  id: Scalars['Int'];
  input: ClientUpdateInput;
};


export type MutationUpdateClientStatusArgs = {
  id: Scalars['Int'];
  status: Scalars['String'];
};

export type PaginatedCards = {
  __typename?: 'PaginatedCards';
  cards: Array<Card>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedClients = {
  __typename?: 'PaginatedClients';
  clients: Array<Client>;
  hasMore: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  card?: Maybe<Card>;
  cards: PaginatedCards;
  client?: Maybe<Client>;
  clients: PaginatedClients;
};


export type QueryCardArgs = {
  id: Scalars['Int'];
};


export type QueryCardsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryClientArgs = {
  id: Scalars['Int'];
};


export type QueryClientsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type CreateCardMutationVariables = Exact<{
  clientId: Scalars['Float'];
  input: CardInput;
}>;


export type CreateCardMutation = { __typename?: 'Mutation', createCard: { __typename?: 'Card', id: number, cardNumber: string, cardProvider: string, cvv: string, pin: string, expiryDate: string, clientId: number, createdAt: any, updatedAt: string } };

export type DeleteCardMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCardMutation = { __typename?: 'Mutation', deleteCard: string };

export type UpdateCardMutationVariables = Exact<{
  id: Scalars['Int'];
  input: CardInput;
}>;


export type UpdateCardMutation = { __typename?: 'Mutation', updateCard?: { __typename?: 'Card', id: number, cardNumber: string, cardProvider: string, cvv: string, pin: string, expiryDate: string, clientId: number, createdAt: any, updatedAt: string } | null };

export type CreateClientMutationVariables = Exact<{
  input: ClientInput;
}>;


export type CreateClientMutation = { __typename?: 'Mutation', createClient: { __typename?: 'Client', id: number, firstName: string, secondName: string, lastName: string, secondLastName: string, birthDate: string, email: string, phone: string, status: string, assignedAnalyst: string, createdAt: string, updatedAt: string } };

export type DeleteClientMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteClientMutation = { __typename?: 'Mutation', deleteClient: string };

export type UpdateClientMutationVariables = Exact<{
  id: Scalars['Int'];
  input: ClientUpdateInput;
}>;


export type UpdateClientMutation = { __typename?: 'Mutation', updateClient?: { __typename?: 'Client', id: number, firstName: string, secondName: string, lastName: string, secondLastName: string, birthDate: string, email: string, phone: string, createdAt: string, updatedAt: string } | null };

export type UpdateClientStatusMutationVariables = Exact<{
  id: Scalars['Int'];
  status: Scalars['String'];
}>;


export type UpdateClientStatusMutation = { __typename?: 'Mutation', updateClientStatus?: { __typename?: 'Client', id: number, firstName: string, secondName: string, lastName: string, secondLastName: string, birthDate: string, status: string, email: string, phone: string, createdAt: string, updatedAt: string } | null };

export type CardQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type CardQuery = { __typename?: 'Query', card?: { __typename?: 'Card', id: number, cardNumber: string, cardProvider: string, cvv: string, pin: string, clientId: number, expiryDate: string, createdAt: any, updatedAt: string } | null };

export type CardsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type CardsQuery = { __typename?: 'Query', cards: { __typename?: 'PaginatedCards', hasMore: boolean, cards: Array<{ __typename?: 'Card', id: number, cardNumber: string, cardProvider: string, cvv: string, pin: string, expiryDate: string, clientId: number, createdAt: any, updatedAt: string }> } };

export type ClientQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ClientQuery = { __typename?: 'Query', client?: { __typename?: 'Client', id: number, firstName: string, secondName: string, lastName: string, secondLastName: string, birthDate: string, email: string, phone: string, status: string, assignedAnalyst: string, createdAt: string, updatedAt: string } | null };

export type ClientsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type ClientsQuery = { __typename?: 'Query', clients: { __typename?: 'PaginatedClients', hasMore: boolean, clients: Array<{ __typename?: 'Client', id: number, firstName: string, secondName: string, lastName: string, secondLastName: string, birthDate: string, email: string, phone: string, status: string, assignedAnalyst: string, createdAt: string, updatedAt: string }> } };


export const CreateCardDocument = gql`
    mutation CreateCard($clientId: Float!, $input: CardInput!) {
  createCard(clientId: $clientId, input: $input) {
    id
    cardNumber
    cardProvider
    cvv
    pin
    expiryDate
    clientId
    createdAt
    updatedAt
  }
}
    `;
export type CreateCardMutationFn = Apollo.MutationFunction<CreateCardMutation, CreateCardMutationVariables>;

/**
 * __useCreateCardMutation__
 *
 * To run a mutation, you first call `useCreateCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCardMutation, { data, loading, error }] = useCreateCardMutation({
 *   variables: {
 *      clientId: // value for 'clientId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCardMutation(baseOptions?: Apollo.MutationHookOptions<CreateCardMutation, CreateCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCardMutation, CreateCardMutationVariables>(CreateCardDocument, options);
      }
export type CreateCardMutationHookResult = ReturnType<typeof useCreateCardMutation>;
export type CreateCardMutationResult = Apollo.MutationResult<CreateCardMutation>;
export type CreateCardMutationOptions = Apollo.BaseMutationOptions<CreateCardMutation, CreateCardMutationVariables>;
export const DeleteCardDocument = gql`
    mutation DeleteCard($id: Int!) {
  deleteCard(id: $id)
}
    `;
export type DeleteCardMutationFn = Apollo.MutationFunction<DeleteCardMutation, DeleteCardMutationVariables>;

/**
 * __useDeleteCardMutation__
 *
 * To run a mutation, you first call `useDeleteCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCardMutation, { data, loading, error }] = useDeleteCardMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCardMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCardMutation, DeleteCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCardMutation, DeleteCardMutationVariables>(DeleteCardDocument, options);
      }
export type DeleteCardMutationHookResult = ReturnType<typeof useDeleteCardMutation>;
export type DeleteCardMutationResult = Apollo.MutationResult<DeleteCardMutation>;
export type DeleteCardMutationOptions = Apollo.BaseMutationOptions<DeleteCardMutation, DeleteCardMutationVariables>;
export const UpdateCardDocument = gql`
    mutation UpdateCard($id: Int!, $input: CardInput!) {
  updateCard(id: $id, input: $input) {
    id
    cardNumber
    cardProvider
    cvv
    pin
    expiryDate
    clientId
    createdAt
    updatedAt
  }
}
    `;
export type UpdateCardMutationFn = Apollo.MutationFunction<UpdateCardMutation, UpdateCardMutationVariables>;

/**
 * __useUpdateCardMutation__
 *
 * To run a mutation, you first call `useUpdateCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCardMutation, { data, loading, error }] = useUpdateCardMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCardMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCardMutation, UpdateCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCardMutation, UpdateCardMutationVariables>(UpdateCardDocument, options);
      }
export type UpdateCardMutationHookResult = ReturnType<typeof useUpdateCardMutation>;
export type UpdateCardMutationResult = Apollo.MutationResult<UpdateCardMutation>;
export type UpdateCardMutationOptions = Apollo.BaseMutationOptions<UpdateCardMutation, UpdateCardMutationVariables>;
export const CreateClientDocument = gql`
    mutation CreateClient($input: ClientInput!) {
  createClient(input: $input) {
    id
    firstName
    secondName
    lastName
    secondLastName
    birthDate
    email
    phone
    status
    assignedAnalyst
    createdAt
    updatedAt
  }
}
    `;
export type CreateClientMutationFn = Apollo.MutationFunction<CreateClientMutation, CreateClientMutationVariables>;

/**
 * __useCreateClientMutation__
 *
 * To run a mutation, you first call `useCreateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClientMutation, { data, loading, error }] = useCreateClientMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateClientMutation(baseOptions?: Apollo.MutationHookOptions<CreateClientMutation, CreateClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClientMutation, CreateClientMutationVariables>(CreateClientDocument, options);
      }
export type CreateClientMutationHookResult = ReturnType<typeof useCreateClientMutation>;
export type CreateClientMutationResult = Apollo.MutationResult<CreateClientMutation>;
export type CreateClientMutationOptions = Apollo.BaseMutationOptions<CreateClientMutation, CreateClientMutationVariables>;
export const DeleteClientDocument = gql`
    mutation DeleteClient($id: Int!) {
  deleteClient(id: $id)
}
    `;
export type DeleteClientMutationFn = Apollo.MutationFunction<DeleteClientMutation, DeleteClientMutationVariables>;

/**
 * __useDeleteClientMutation__
 *
 * To run a mutation, you first call `useDeleteClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClientMutation, { data, loading, error }] = useDeleteClientMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteClientMutation(baseOptions?: Apollo.MutationHookOptions<DeleteClientMutation, DeleteClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteClientMutation, DeleteClientMutationVariables>(DeleteClientDocument, options);
      }
export type DeleteClientMutationHookResult = ReturnType<typeof useDeleteClientMutation>;
export type DeleteClientMutationResult = Apollo.MutationResult<DeleteClientMutation>;
export type DeleteClientMutationOptions = Apollo.BaseMutationOptions<DeleteClientMutation, DeleteClientMutationVariables>;
export const UpdateClientDocument = gql`
    mutation UpdateClient($id: Int!, $input: ClientUpdateInput!) {
  updateClient(id: $id, input: $input) {
    id
    firstName
    secondName
    lastName
    secondLastName
    birthDate
    email
    phone
    createdAt
    updatedAt
  }
}
    `;
export type UpdateClientMutationFn = Apollo.MutationFunction<UpdateClientMutation, UpdateClientMutationVariables>;

/**
 * __useUpdateClientMutation__
 *
 * To run a mutation, you first call `useUpdateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClientMutation, { data, loading, error }] = useUpdateClientMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateClientMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClientMutation, UpdateClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClientMutation, UpdateClientMutationVariables>(UpdateClientDocument, options);
      }
export type UpdateClientMutationHookResult = ReturnType<typeof useUpdateClientMutation>;
export type UpdateClientMutationResult = Apollo.MutationResult<UpdateClientMutation>;
export type UpdateClientMutationOptions = Apollo.BaseMutationOptions<UpdateClientMutation, UpdateClientMutationVariables>;
export const UpdateClientStatusDocument = gql`
    mutation UpdateClientStatus($id: Int!, $status: String!) {
  updateClientStatus(id: $id, status: $status) {
    id
    firstName
    secondName
    lastName
    secondLastName
    birthDate
    status
    email
    phone
    createdAt
    updatedAt
  }
}
    `;
export type UpdateClientStatusMutationFn = Apollo.MutationFunction<UpdateClientStatusMutation, UpdateClientStatusMutationVariables>;

/**
 * __useUpdateClientStatusMutation__
 *
 * To run a mutation, you first call `useUpdateClientStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClientStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClientStatusMutation, { data, loading, error }] = useUpdateClientStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateClientStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClientStatusMutation, UpdateClientStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClientStatusMutation, UpdateClientStatusMutationVariables>(UpdateClientStatusDocument, options);
      }
export type UpdateClientStatusMutationHookResult = ReturnType<typeof useUpdateClientStatusMutation>;
export type UpdateClientStatusMutationResult = Apollo.MutationResult<UpdateClientStatusMutation>;
export type UpdateClientStatusMutationOptions = Apollo.BaseMutationOptions<UpdateClientStatusMutation, UpdateClientStatusMutationVariables>;
export const CardDocument = gql`
    query Card($id: Int!) {
  card(id: $id) {
    id
    cardNumber
    cardProvider
    cvv
    pin
    clientId
    expiryDate
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useCardQuery__
 *
 * To run a query within a React component, call `useCardQuery` and pass it any options that fit your needs.
 * When your component renders, `useCardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCardQuery(baseOptions: Apollo.QueryHookOptions<CardQuery, CardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CardQuery, CardQueryVariables>(CardDocument, options);
      }
export function useCardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CardQuery, CardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CardQuery, CardQueryVariables>(CardDocument, options);
        }
export type CardQueryHookResult = ReturnType<typeof useCardQuery>;
export type CardLazyQueryHookResult = ReturnType<typeof useCardLazyQuery>;
export type CardQueryResult = Apollo.QueryResult<CardQuery, CardQueryVariables>;
export const CardsDocument = gql`
    query Cards($limit: Int!, $cursor: String) {
  cards(limit: $limit, cursor: $cursor) {
    cards {
      id
      cardNumber
      cardProvider
      cvv
      pin
      expiryDate
      clientId
      createdAt
      updatedAt
    }
    hasMore
  }
}
    `;

/**
 * __useCardsQuery__
 *
 * To run a query within a React component, call `useCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useCardsQuery(baseOptions: Apollo.QueryHookOptions<CardsQuery, CardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CardsQuery, CardsQueryVariables>(CardsDocument, options);
      }
export function useCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CardsQuery, CardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CardsQuery, CardsQueryVariables>(CardsDocument, options);
        }
export type CardsQueryHookResult = ReturnType<typeof useCardsQuery>;
export type CardsLazyQueryHookResult = ReturnType<typeof useCardsLazyQuery>;
export type CardsQueryResult = Apollo.QueryResult<CardsQuery, CardsQueryVariables>;
export const ClientDocument = gql`
    query Client($id: Int!) {
  client(id: $id) {
    id
    firstName
    secondName
    lastName
    secondLastName
    birthDate
    email
    phone
    status
    assignedAnalyst
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useClientQuery__
 *
 * To run a query within a React component, call `useClientQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useClientQuery(baseOptions: Apollo.QueryHookOptions<ClientQuery, ClientQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClientQuery, ClientQueryVariables>(ClientDocument, options);
      }
export function useClientLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClientQuery, ClientQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClientQuery, ClientQueryVariables>(ClientDocument, options);
        }
export type ClientQueryHookResult = ReturnType<typeof useClientQuery>;
export type ClientLazyQueryHookResult = ReturnType<typeof useClientLazyQuery>;
export type ClientQueryResult = Apollo.QueryResult<ClientQuery, ClientQueryVariables>;
export const ClientsDocument = gql`
    query Clients($limit: Int!, $cursor: String) {
  clients(limit: $limit, cursor: $cursor) {
    clients {
      id
      firstName
      secondName
      lastName
      secondLastName
      birthDate
      email
      phone
      status
      assignedAnalyst
      createdAt
      updatedAt
    }
    hasMore
  }
}
    `;

/**
 * __useClientsQuery__
 *
 * To run a query within a React component, call `useClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useClientsQuery(baseOptions: Apollo.QueryHookOptions<ClientsQuery, ClientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClientsQuery, ClientsQueryVariables>(ClientsDocument, options);
      }
export function useClientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClientsQuery, ClientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClientsQuery, ClientsQueryVariables>(ClientsDocument, options);
        }
export type ClientsQueryHookResult = ReturnType<typeof useClientsQuery>;
export type ClientsLazyQueryHookResult = ReturnType<typeof useClientsLazyQuery>;
export type ClientsQueryResult = Apollo.QueryResult<ClientsQuery, ClientsQueryVariables>;
