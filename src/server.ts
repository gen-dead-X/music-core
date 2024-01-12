import "reflect-metadata";
import path from "path";
// console.log(first)
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { Query, Resolver, buildSchema } from "type-graphql";
import { RecipeResolver } from "./recipe/recipe.resolver";
import express from "express";
import cors from "cors";
import config from "./config/config";

@Resolver()
class HelloWorld {
  @Query(() => String, { name: "Hello" })
  async helloWorld() {
    return "Hello World!";
  }
}

async function bootstrap() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  console.log(RecipeResolver);

  /* Build TypeGraphQL executable schema
     const schema = await buildSchema({
      // Array of resolvers
      resolvers: [RecipeResolver],
      // Create 'schema.graphql' file with schema definition in current directory
      emitSchemaFile: path.resolve(__dirname, "schema.graphql"),
    }); */

  const schema = await buildSchema({
    resolvers: [HelloWorld, RecipeResolver],
  });

  const server = new ApolloServer({ schema });

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(config.PORT ?? 4040, () => {
    console.log(
      `Server Running on http://localhost:${config.PORT ?? 4040}/graphql 🚥`
    );
  });
}

bootstrap().catch(console.error);
