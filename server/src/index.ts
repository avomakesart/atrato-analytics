import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import cors from 'cors';
import 'dotenv-safe/config';
import express from 'express';
import { join } from 'path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { Card, Client } from './entities';
import { ClientResolver } from './resolvers';
import { createClientLoader } from './utils';
import { CardResolver } from './resolvers/card';

const main = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    // ssl: {
    //   requestCert: true,
    //   rejectUnauthorized: false,
    // },
    migrations: [join(__dirname, './migrations/*')],
    entities: [Card, Client],
  });

  const app = express();

  app.set('trust proxy', 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ClientResolver, CardResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      clientLoader: createClientLoader(),
    }),
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  const PORT = process.env.PORT || 8000;

  app.listen(PORT, () => {
    console.log(`🚀 Server started on http://localhost:${PORT}/graphql`);
  });
};

main().catch((err) => console.error(err));
