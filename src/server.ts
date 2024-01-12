import 'reflect-metadata';
// import path from 'path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { Query, Resolver, buildSchema } from 'type-graphql';
import express from 'express';
import cors from 'cors';
import config from './config/config';
import Resolvers from '@resolvers/resolvers';
import connectToPostgres from '@config/postgres.connection.config';

connectToPostgres();

@Resolver()
class HelloWorld {
  @Query(() => String, { name: 'Hello' })
  async helloWorld() {
    return 'Hello World!';
  }
}
async function bootstrap() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  //  Build TypeGraphQL executable schema
  //  Test
  // const schema = await buildSchema({
  //   // Array of resolvers
  //   resolvers: [HelloWorld, RecipeResolver, ...allResolvers()],
  //   // Create 'schema.graphql' file with schema definition in current directory
  //   emitSchemaFile: path.resolve(__dirname, 'schema.graphql'),
  // });

  const schema = await buildSchema({
    resolvers: [HelloWorld, ...Resolvers()],
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );

  app.listen(config.PORT ?? 4040, () => {
    console.log(
      `Server Running on http://localhost:${config.PORT ?? 4040}/graphql 🚥`
    );
  });
}

bootstrap().catch(console.error);
